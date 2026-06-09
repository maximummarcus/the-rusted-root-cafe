import React, { useEffect, useMemo, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { adminSaveSpecial, adminDeleteSpecial } from '@/api/adminApi';
import { timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Trash2, Pencil, X, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

const EMPTY = { title: '', description: '', price: '', type: 'food', image_url: '', active: true, sort_order: 0, month_label: '' };

// Accept common web image types only; cap uploads so a giant phone photo can't hang the form.
const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // ~10MB

const sortSpecials = (list) =>
  [...list].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || (a.title || '').localeCompare(b.title || ''));

export default function SpecialsTab() {
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadSpecials = () =>
    base44.entities.Special.list('sort_order')
      .then((list) => setSpecials(sortSpecials(list)))
      .catch(() => setSpecials([]))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadSpecials();
  }, []);

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setUploadError(null);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // let the same file be re-picked later (e.g. after Remove)
    if (!file) return;
    setUploadError(null);

    if (file.type && !file.type.startsWith('image/')) {
      setUploadError('Please choose an image file (JPG, PNG, etc.).');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setUploadError('That image is too large — please keep it under 10MB.');
      return;
    }

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, image_url: file_url }));
      toast.success('Image uploaded');
    } catch {
      setUploadError('Upload failed — please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setForm((f) => ({ ...f, image_url: '' }));
    setUploadError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    const payload = { ...form, sort_order: Number(form.sort_order) || 0 };
    const prev = specials;

    if (editingId) {
      // Optimistic update
      setSpecials((list) => sortSpecials(list.map((s) => (s.id === editingId ? { ...s, ...payload } : s))));
      try {
        const saved = await adminSaveSpecial(payload, editingId);
        setSpecials((list) => sortSpecials(list.map((s) => (s.id === editingId ? saved : s))));
        setLastUpdated(Date.now());
        toast.success('Special updated');
        resetForm();
      } catch (err) {
        setSpecials(prev); // rollback
        toast.error(err.message);
      } finally {
        setSaving(false);
      }
    } else {
      // Optimistic add with a temporary id
      const tempId = `temp-${Date.now()}`;
      setSpecials((list) => sortSpecials([...list, { id: tempId, ...payload }]));
      try {
        const saved = await adminSaveSpecial(payload);
        setSpecials((list) => sortSpecials(list.map((s) => (s.id === tempId ? saved : s))));
        setLastUpdated(Date.now());
        toast.success('Special added');
        resetForm();
      } catch (err) {
        setSpecials((list) => list.filter((s) => s.id !== tempId)); // rollback
        toast.error(err.message);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleEdit = (s) => {
    setForm({
      title: s.title || '',
      description: s.description || '',
      price: s.price || '',
      type: s.type || 'food',
      image_url: s.image_url || '',
      active: s.active ?? true,
      sort_order: s.sort_order ?? 0,
      month_label: s.month_label || '',
    });
    setEditingId(s.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggle = async (s) => {
    const prev = specials;
    setSpecials((list) => list.map((x) => (x.id === s.id ? { ...x, active: !x.active } : x))); // optimistic
    try {
      await adminSaveSpecial({ ...s, active: !s.active }, s.id);
      setLastUpdated(Date.now());
    } catch (err) {
      setSpecials(prev); // rollback
      toast.error(err.message);
    }
  };

  const handleDelete = async (s) => {
    if (!window.confirm(`Delete "${s.title}"?`)) return;
    const prev = specials;
    setSpecials((list) => list.filter((x) => x.id !== s.id)); // optimistic
    if (editingId === s.id) resetForm();
    try {
      await adminDeleteSpecial(s.id);
      setLastUpdated(Date.now());
      toast.success('Deleted');
    } catch (err) {
      setSpecials(prev); // rollback
      toast.error(err.message);
    }
  };

  const lastUpdatedLabel = useMemo(() => {
    const newest = specials.reduce((acc, s) => {
      const t = s.updated_date ? new Date(s.updated_date).getTime() : 0;
      return t > acc ? t : acc;
    }, lastUpdated || 0);
    return newest ? timeAgo(newest) : null;
  }, [specials, lastUpdated]);

  return (
    <div className="space-y-6">
      {lastUpdatedLabel && (
        <p className="text-xs text-muted-foreground">Last updated: {lastUpdatedLabel}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-foreground">{editingId ? 'Edit Special' : 'New Special'}</h2>
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={resetForm} className="gap-1">
              <X className="w-4 h-4" /> Cancel
            </Button>
          )}
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Title *</Label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Pumpkin Spice Latte" />
          </div>
          <div className="space-y-1.5">
            <Label>Price</Label>
            <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="$5.50" />
          </div>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="drink">Drink</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Sort order</Label>
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: e.target.value })}
              placeholder="0"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="A cozy seasonal favorite..." />
        </div>
        <div className="space-y-1.5">
          <Label>Image <span className="text-muted-foreground font-normal">(optional — a placeholder is fine)</span></Label>
          {form.image_url ? (
            <div className="flex items-center gap-3">
              <img src={form.image_url} alt="Special preview" className="w-16 h-16 rounded-xl object-cover shrink-0 border border-border" />
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary text-secondary-foreground cursor-pointer text-sm font-semibold hover:opacity-90 transition">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                  {uploading ? 'Uploading…' : 'Replace'}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
                <Button type="button" variant="ghost" size="sm" onClick={handleRemoveImage} disabled={uploading} className="gap-1 text-muted-foreground">
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
              </div>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 px-4 py-6 rounded-xl border border-dashed border-border bg-secondary/40 text-secondary-foreground cursor-pointer text-sm font-semibold hover:bg-secondary transition">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
              {uploading ? 'Uploading…' : 'Upload image'}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
          {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
          <Label>Active (shown on the site)</Label>
        </div>
        <div className="pt-1">
          <Button type="submit" disabled={saving || uploading} className="gap-2 min-h-[48px] w-full sm:w-auto">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {editingId ? 'Update Special' : 'Add Special'}
          </Button>
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : specials.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No specials yet — add your first above.</p>
      ) : (
        <div className="space-y-3">
          {specials.map((s) => (
            <div key={s.id} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3">
              {s.image_url ? (
                <img src={s.image_url} alt={s.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-secondary shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-heading text-base text-foreground truncate">{s.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-sunflower/30 text-brand-coffee uppercase">{s.type}</span>
                  {!s.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase">Hidden</span>}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {[s.price, s.updated_date ? `updated ${timeAgo(s.updated_date)}` : null].filter(Boolean).join(' · ')}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Switch checked={!!s.active} onCheckedChange={() => handleToggle(s)} aria-label="Toggle active" />
                <Button size="icon" variant="ghost" onClick={() => handleEdit(s)} aria-label="Edit"><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => handleDelete(s)} aria-label="Delete"><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
