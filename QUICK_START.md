# 🚀 Quick Start Guide - Frontend Integration

## 🎯 Fitur Utama yang Tersedia

### 1. Kategori (`/category`)

**Apa yang bisa dilakukan:**

- Lihat semua kategori
- Buat kategori baru
- Edit kategori
- Hapus kategori
- Loading state dan error handling

**Akses:** Sidebar → Kategori atau `/category`

---

### 2. Tugas (`/task`)

**Apa yang bisa dilakukan:**

- Lihat semua tugas
- Buat tugas baru (pilih kategori)
- Edit tugas
- Hapus tugas
- Filter by kategori
- Filter by status (semua/pending/selesai)
- Checkbox status

**Akses:** Sidebar → Tugas atau `/task`

---

### 3. Dashboard (`/dashboard`)

**Yang ditampilkan:**

- Total kategori
- Statistik tugas (pending vs selesai)
- 3 kategori terbaru
- 3 tugas terbaru
- Quick links ke halaman lengkap

**Akses:** Sidebar → Dashboard atau `/dashboard`

---

### 4. Pengaturan (`/settings`)

**Yang bisa diatur:**

- Edit profil (nama, email, avatar URL)
- Lihat status keamanan
- Logout dari aplikasi

**Akses:** Sidebar → Settings atau `/settings`

---

## 📱 Layout & Navigation

### Sidebar Menu

```
Dashboard  [🏠]
Kategori   [📁]
Tugas      [✓]
Settings   [⚙️]
```

Sidebar **collapse-able** untuk tampilan mobile yang lebih clean.

---

## 🎨 UI Components

### Komponen yang Digunakan

- **Card** - Container untuk konten
- **Button** - Aksi (Tambah, Edit, Hapus, Batal, Simpan)
- **Input** - Text field
- **Textarea** - Multi-line text (untuk deskripsi)
- **Dialog/Modal** - Popup untuk form
- **Select** - Dropdown (kategori selection)
- **Checkbox** - Toggle status
- **Skeleton** - Loading indicator
- **Badge** - Tag kategori

---

## ⚡ Common Actions

### Membuat Item Baru

1. Klik tombol "Tambah" (biasanya di atas)
2. Isi form di modal
3. Klik "Tambah" untuk save

### Edit Item

1. Klik icon **Edit** (pensil)
2. Form modal terbuka dengan data
3. Ubah data yang perlu
4. Klik "Perbarui" untuk save

### Hapus Item

1. Klik icon **Hapus** (sampah merah)
2. Item dihapus dari list
3. Notifikasi akan muncul

### Filter/Search

1. Di halaman Tugas: gunakan dropdown kategori
2. Gunakan button filter (Semua/Pending/Selesai)
3. List akan di-update secara real-time

---

## 🔔 Notifikasi

### Success (Hijau)

```
✓ Berhasil
Pesan detail action yang berhasil
```

### Error (Merah)

```
✗ Gagal
Pesan detail error
```

### Warning (Kuning)

```
⚠️ Peringatan
Pesan warning
```

Klik atau tunggu 3 detik untuk dismiss.

---

## 📊 Data Structures

### Kategori

```
{
  id: string
  title: string (nama kategori)
  description: string (penjelasan)
  userId: string
  createdAt: date
  updatedAt: date
}
```

### Tugas

```
{
  id: string
  todo: string (deskripsi tugas)
  categoryID: string (link ke kategori)
  startAt: date (tanggal mulai)
  isDone: boolean (status selesai)
  userID: string
  createdAt: date
  updatedAt: date
}
```

### Profil

```
{
  id: string
  fullName: string (nama)
  email: string
  photoUrl: string (URL avatar)
  role: string
  isVerify: boolean
  token: string
}
```

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** Shadcn/ui
- **State Management:** React Hooks + Redux (auth)
- **Data Fetching:** React Query (@tanstack/react-query)
- **Icons:** Lucide React
- **Dates:** date-fns

---

## 🔑 Keyboard Shortcuts (Optional)

Saat ini tidak ada, tapi bisa ditambahkan:

- `Ctrl+K` - Command palette
- `Esc` - Close modal
- `/` - Focus search

---

## 🐛 Troubleshooting

### "Module not found" error

**Solusi:** Refresh page atau clear `.next` cache

### Modal tidak appear

**Solusi:** Pastikan onClick handler bekerja

### Data tidak update

**Solusi:** Check network tab, pastikan API respond dengan baik

### Timeout/Loading forever

**Solusi:** Check API endpoint, pastikan server berjalan

---

## 📱 Mobile Responsiveness

✅ **Fully Responsive**

- Layout menyesuaikan dengan screen size
- Buttons dan inputs touch-friendly
- Sidebar collapsible
- Text readable di semua ukuran

### Tested on:

- iPhone (375px)
- iPad (768px)
- Desktop (1024px+)

---

## 🎓 Code Pattern Reference

### Container Pattern

```tsx
"use client";
const MyContainer = () => {
  const service = useService();
  const query = service.SomeFeature.query();
  const mutation = service.SomeFeature.mutation.useCreate();

  const handleCreate = (payload) => {
    mutation.mutate(payload, {
      onSuccess: () => {
        query.refetchAll();
      },
    });
  };

  return <MySection data={query.data} onCreate={handleCreate} />;
};
```

### Section Pattern

```tsx
const MySection = ({ data, onCreate }) => {
  return (
    <div>
      <MyListPartial items={data} />
      <MyModalPartial onCreate={onCreate} />
    </div>
  );
};
```

### Partial Pattern

```tsx
const MyListPartial = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Card key={item.id}>{/* Item display */}</Card>
      ))}
    </div>
  );
};
```

---

## 📚 Files Reference

### Pages

- `src/app/(private)/category/page.tsx`
- `src/app/(private)/task/page.tsx`
- `src/app/(private)/dashboard/page.tsx`
- `src/app/(private)/settings/page.tsx`

### Containers

- `src/app/(private)/category/_container/category.tsx`
- `src/app/(private)/task/_container/task.tsx`
- `src/app/(private)/dashboard/_container/dashboard.tsx`
- `src/app/(private)/settings/_container/settings.tsx`

### Sections

- `src/components/section/private/category/`
- `src/components/section/private/task/`
- `src/components/section/private/dashboard-hero-section.tsx`
- `src/components/section/private/settings-hero-section.tsx`

### Partials

- `src/components/partial/private/category/`
- `src/components/partial/private/task/`
- `src/components/partial/private/dashboard-*.tsx`
- `src/components/partial/private/settings-*.tsx`

---

## ✅ Pre-Launch Checklist

Sebelum go-live:

- [ ] Test semua CRUD operations
- [ ] Test filter dan search
- [ ] Test pada device mobile
- [ ] Test error cases (hapus kategori dengan tasks)
- [ ] Test logout dan re-login
- [ ] Verify semua API endpoints
- [ ] Check network requests
- [ ] Verify permissions/auth
- [ ] Test edge cases (empty states, loading)
- [ ] Performance check

---

## 📞 Support

Jika ada masalah:

1. Check browser console untuk errors
2. Check network tab di DevTools
3. Verify API server is running
4. Clear cache dan reload
5. Check credentials/auth token

---

**Last Updated:** November 24, 2025  
**Version:** 1.0  
**Status:** Ready for Use ✅
