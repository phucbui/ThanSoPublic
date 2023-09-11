const express = require('express')
const {
  splitName, 
  splitDate, 
  formatDDMMYYYYSlash, 
  chi_so_duong_doi,
  chi_so_can_bang,
  chi_so_su_menh,
  chi_so_duong_doi_minus_su_menh,
  filterNguyenAm,
  chi_so_linh_hon,
  chi_so_ngay_sinh,
  filterPhuAm,
  chi_so_nhan_cach,
  chi_so_ket_noi_nhan_cach_minus_linh_hon,
  chi_so_truong_thanh,
  chi_so_thieu,
  chi_so_tu_duy_ly_tri,
  chi_so_suc_manh_tiem_thuc,
  chi_so_dam_me,
  chi_so_nam_ca_nhan,
  chi_so_thang_ca_nhan,
  chi_so_ngay_ca_nhan,
  chi_so_chang,
  chi_so_thach_thuc
} = require('./utils/Common')
const app = express()
const port = 3000


app.get('/', (req, res) => {
  var ho_va_ten = "Bui Thi Minh Thao";
  var ngay_thang_nam_sinh = "21/2/1990";
  var test = {
    ho_va_ten_goc:ho_va_ten,
    ho_va_ten:splitName(ho_va_ten),
    ngay_thang_nam_sinh_goc: ngay_thang_nam_sinh,
    ngay_thang_nam_sinh: splitDate(ngay_thang_nam_sinh),
    ngay_hien_tai: splitDate(formatDDMMYYYYSlash(new Date())),
    chi_so_duong_doi: chi_so_duong_doi(ngay_thang_nam_sinh),
    chi_so_can_bang: chi_so_can_bang(ho_va_ten),
    chi_so_su_menh: chi_so_su_menh(ho_va_ten),
    chi_so_duong_doi_minus_su_menh: chi_so_duong_doi_minus_su_menh(ho_va_ten, ngay_thang_nam_sinh),
    filterNguyenAm: filterNguyenAm("Nguyen Dieu Ly"),
    chi_so_linh_hon: chi_so_linh_hon("Nguyen Dieu Ly"),
    chi_so_ngay_sinh: chi_so_ngay_sinh(ngay_thang_nam_sinh),
    filterPhuAm: filterPhuAm("Nguyen Dieu Yen"),
    chi_so_nhan_cach: chi_so_nhan_cach("Tran Thu Trang"),
    chi_so_ket_noi_nhan_cach_minus_linh_hon: chi_so_ket_noi_nhan_cach_minus_linh_hon("Tran Thu Trang"),
    chi_so_truong_thanh: chi_so_truong_thanh(ho_va_ten, ngay_thang_nam_sinh),
    chi_so_thieu: chi_so_thieu("Tran Thu Trang"),
    chi_so_tu_duy_ly_tri: chi_so_tu_duy_ly_tri(ho_va_ten, ngay_thang_nam_sinh),
    chi_so_suc_manh_tiem_thuc: chi_so_suc_manh_tiem_thuc("Tran Thu Trang"),
    chi_so_dam_me: chi_so_dam_me("Tran Thu Trang"),
    chi_so_nam_ca_nhan: chi_so_nam_ca_nhan(ngay_thang_nam_sinh),
    chi_so_thang_ca_nhan: chi_so_thang_ca_nhan(ngay_thang_nam_sinh),
    chi_so_ngay_ca_nhan:chi_so_ngay_ca_nhan(ngay_thang_nam_sinh),
    chi_so_chang: chi_so_chang(ngay_thang_nam_sinh),
    chi_so_thach_thuc: chi_so_thach_thuc(ngay_thang_nam_sinh)
  };
  res.send(test);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})