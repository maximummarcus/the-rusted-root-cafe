import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Trash2, Pencil, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

const EMPTY = { title: '', description: '', price: '', type: 'food', image_url: '', active: true, month_label: '' };

export default function AdminSpecials() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [specials, setSpecials] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadSpecials = () =>
    base44.entities.Special.list('-created_date').then(setSpecials).catch(() => setSpecials([]));

  useEffect(() => {
    base44.auth.me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
    loadSpecials();
  }, []);

  const isAdmin = user?.role === 'admin';

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      setForm((f) => ({ ...f, image_url: file_url }));
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      toast.error('Title is required');
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await base44.entities.Special.update(editingId, form);
        toast.success('Special updated');
      } else {
        await base44.entities.Special.create(form);
        toast.success('Special added');
      }
      resetForm();
      loadSpecials();
    } catch {
      toast.error('Could not save. Make sure your account is an admin.');
    } finally {
      setSaving(false);
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
      month_label: s.month_label || '',
    });
    setEditingId(s.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggle = async (s) => {
    await base44.entities.Special.update(s.id, { active: !s.active });
    loadSpecials();
  };

  const handleDelete = async (s) => {
    if (!confirm(`Delete "${s.title}"?`)) return;
    await base44.entities.Special.delete(s.id);
    toast.success('Deleted');
    loadSpecials();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl text-foreground">Admins only</h1>
        <p className="mt-3 text-muted-foreground">
          This page is for managing café specials. Your account needs the admin role to edit specials.
        </p>
      </div>
    );
  }

  return (
    <>
      <Seo title="Manage Specials: The Rusted Root Cafe" description="Admin tool to manage café specials." />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-heading text-4xl text-foreground mb-2">Manage Specials</h1>
        <p className="text-muted-foreground mb-8">Add, edit, and toggle your monthly food &amp; drink specials.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4 mb-10">
          <h2 className="font-heading text-2xl text-foreground">{editingId ? 'Edit Special' : 'New Special'}</h2>
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
              <Label>Month Label</Label>
              <Input value={form.month_label} onChange={(e) => setForm({ ...form, month_label: e.target.value })} placeholder="October Specials" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="A cozy seasonal favorite..." />
          </div>
          <div className="space-y-1.5">
            <Label>Photo</Label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground cursor-pointer text-sm font-semibold">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
                Upload
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
              </label>
              {form.image_url && <img src={form.image_url} alt="preview" className="w-14 h-14 rounded-xl object-cover" />}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
            <Label>Active (shown on the site)</Label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {editingId ? 'Update' : 'Add Special'}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="space-y-3">
          {specials.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No specials yet. Add your first above.</p>
          ) : (
            specials.map((s) => (
              <div key={s.id} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-3">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-secondary shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-lg text-foreground truncate">{s.title}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-brand-sunflower/30 text-brand-coffee uppercase">{s.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{s.price} · {s.month_label}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch checked={!!s.active} onCheckedChange={() => handleToggle(s)} />
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(s)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(s)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}