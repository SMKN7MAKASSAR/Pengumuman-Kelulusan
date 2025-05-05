function isPayloadBerbahaya(nisn) {
    const polaBerbahaya = /<script|select|insert|update|delete|union|--|['"\\<>]/i;
    return polaBerbahaya.test(nisn);
}

function cekNISN() {
    const nisn = document.getElementById("nisnInput").value.trim();
    
    // Cek apakah ada potensi payload berbahaya
    if (isPayloadBerbahaya(nisn)) {
        window.location.href = "blokir.html";
        return;
    }

    // Daftar NISN yang perlu diarahkan ke halaman penting1.html
    const nisnPenting = ["0078806250"];  // Tambahkan NISN yang perlu diarahkan ke penting1.html

    // Cek apakah NISN ada dalam daftar penting
    if (nisnPenting.includes(nisn)) {
        window.location.href = "penting1.html";
        return;
    }

    // Cari siswa berdasarkan NISN
    const siswa = Object.values(dataSiswa).find(s => s.nisn === nisn);
    
    // Jika ditemukan siswa
    if (siswa) {
        localStorage.setItem("nama", siswa.nama);
        localStorage.setItem("nisn", siswa.nisn);
        localStorage.setItem("nis", siswa.nis);
        localStorage.setItem("status", siswa.status);
        window.location.href = "hasil.html";
    } else {
        document.getElementById("alert").style.display = "block";
    }
}
