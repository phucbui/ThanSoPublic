const splitName = (name) => {
  return name.toUpperCase().split("");
}
const splitDate = (date) => {
  return date.split("/");
}
const formatDDMMYYYYSlash = (date) => {
  return date.getDate() + "/"+ (date.getMonth()+1) + "/"+ date.getFullYear();
}

const char_num_map = {
  "A" : 1,
  "B" : 2,
  "C" : 3,
  "D" : 4,
  "E" : 5,
  "F" : 6,
  "G" : 7,
  "H" : 8,
  "I" : 9,
  "J" : 1,
  "K" : 2,
  "L" : 3,
  "M" : 4,
  "N" : 5,
  "O" : 6,
  "P" : 7,
  "Q" : 8,
  "R" : 9,
  "S" : 1,
  "T" : 2,
  "U" : 3,
  "V" : 4,
  "W" : 5,
  "X" : 6,
  "Y" : 7,
  "Z" : 8
}
// 1
const chi_so_duong_doi = (ngay_thang_nam_sinh) => {
  let ngay_thang_nam_sinh_new = splitDate(ngay_thang_nam_sinh);
  // 1st calc
  let ngay = calcExclude112233(parseInt(ngay_thang_nam_sinh_new[0]));
  let thang = calcExclude112233(parseInt(ngay_thang_nam_sinh_new[1]));
  let nam = calcExclude112233(parseInt(ngay_thang_nam_sinh_new[2]));
  // console.log(ngay, thang, nam);

  // 2nd calc
  let finalNum = ngay+thang+nam;
  finalNum = calcExclude112233(finalNum)
  
  return finalNum;
  
}
// 2
const chi_so_can_bang = (ho_va_ten) => {
  let firstLetters = getFirstLetters(ho_va_ten);
  let num = 0;
  for(let i = 0; i < firstLetters.length; i++) {
    num += char_num_map[firstLetters[i]];
  }
  num = calcInclude112233(num);
  return num;
}
// 3
const chi_so_su_menh = (ho_va_ten) => {
  let words = ho_va_ten.split(" ");
  let num = 0;
  for(let i = 0; i < words.length; i++) {
    num += calcByWord(words[i]);
  }

  num = calcExclude112233(num);

  return num;
}
//4
const chi_so_duong_doi_minus_su_menh = (ho_va_ten, ngay_thang_nam_sinh) => {

  let duong_doi = chi_so_duong_doi(ngay_thang_nam_sinh);
  duong_doi = calcInclude112233(duong_doi);
  let su_menh = chi_so_su_menh(ho_va_ten);
  su_menh = calcInclude112233(su_menh);
  return Math.abs((duong_doi - su_menh));
}

//5
const chi_so_linh_hon = (ho_va_ten) => {
  let nguyenAm = filterNguyenAm(ho_va_ten);
  return chi_so_su_menh(nguyenAm);
}
//6
const chi_so_ngay_sinh = (ngay_thang_nam_sinh) => {
  let ngay_thang_nam_sinh_new = splitDate(ngay_thang_nam_sinh)
  let ngay = calcInclude112233(parseInt(ngay_thang_nam_sinh_new[0]));
  return ngay;
}
//7
const chi_so_nhan_cach = (ho_va_ten) => {
  let phuAm = filterPhuAm(ho_va_ten);
  return calcByWordFull(phuAm);
}

//8
const chi_so_ket_noi_nhan_cach_minus_linh_hon = (ho_va_ten) => {
  return Math.abs(calcInclude112233(chi_so_nhan_cach(ho_va_ten)) - calcInclude112233(chi_so_linh_hon(ho_va_ten)));
}

//9
const chi_so_truong_thanh = (ho_va_ten, ngay_thang_nam_sinh) => {
  let duong_doi = calcInclude112233(chi_so_duong_doi(ngay_thang_nam_sinh));
  let su_menh = calcInclude112233(chi_so_su_menh(ho_va_ten));
  return calcExclude112233((duong_doi+su_menh));
}

//10
const chi_so_thieu = (ho_va_ten) => {
  let letters = splitName(ho_va_ten);
  let newSet = new Set();
  for(let i =0; i< letters.length;i++) {
    newSet.add(char_num_map[letters[i]]);
  }
  let numbers = [1,2,3,4,5,6,7,8,9];
  let returnNumbers = [];
  for(let i = 0; i < numbers.length;i++ ) {
    if(!newSet.has(numbers[i])) returnNumbers.push(numbers[i]);
  }
  return returnNumbers;
}

//11
const chi_so_tu_duy_ly_tri = (ho_va_ten, ngay_thang_nam_sinh) => {
  let ho_va_ten_arr = ho_va_ten.split(" ");
  let ten = ho_va_ten_arr[ho_va_ten_arr.length-1];
  let ngay = splitDate(ngay_thang_nam_sinh)[0];
  return calcExclude112233((calcByWord(ten)+calcExclude112233(ngay)));
}

//12
const chi_so_suc_manh_tiem_thuc = (ho_va_ten) => {
  return (9 - chi_so_thieu(ho_va_ten).length);
}

//13
const chi_so_dam_me = (ho_va_ten) => {
  let numbers = [];
  let letters = splitName(ho_va_ten);
  for(let i = 0; i < letters.length; i++) {
    if(letters[i] !== " ") numbers.push(char_num_map[letters[i]]);
  }
  let counts = {};
  numbers.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
  let returnArr = [];
  for(let i = 0; i < 9;i++) {
    if(counts[i+1]) {
      returnArr[i] = {
        num: i+1,
        value: counts[i+1]
      }
    } else {
      returnArr[i] = {
        num: i+1,
        value: 0
      }
    }
  }

  returnArr.sort(function(a, b) {
    return b.value - a.value;
  })

  let newArr = returnArr.filter(function(a) {
    return a.value > 1;
  })

  let dam_me = [];
  newArr.forEach(function(a) {
    dam_me.push(a.num);
  })


  return dam_me;
}

// 14
const chi_so_nam_ca_nhan = (ngay_thang_nam_sinh) => {
  let ngay_thang_nam_sinh_new = splitDate(ngay_thang_nam_sinh)
  let ngay = calcInclude112233(parseInt(ngay_thang_nam_sinh_new[0]));
  let thang = calcInclude112233(parseInt(ngay_thang_nam_sinh_new[1]));
  const d = new Date();
  let nam_hien_tai = calcInclude112233(d.getFullYear());
  return calcInclude112233(ngay+thang+nam_hien_tai);
}
//15.1
const chi_so_thang_ca_nhan = (ngay_thang_nam_sinh)=> {
  let ca_nhan = chi_so_nam_ca_nhan(ngay_thang_nam_sinh);
  const d = new Date();
  let thang = d.getMonth()+1;
  return calcInclude112233(ca_nhan+thang);
}
//15.2
const chi_so_ngay_ca_nhan = (ngay_thang_nam_sinh) => {
  // let nam_ca_nhan = chi_so_nam_ca_nhan(ngay_thang_nam_sinh);
  let thang_ca_nhan = chi_so_thang_ca_nhan(ngay_thang_nam_sinh);
  const d = new Date();
  let ngay = d.getDate();
  return calcInclude112233(thang_ca_nhan+ngay);
}
//16
const chi_so_chang = (ngay_thang_nam_sinh) => {
  let ngay_thang_nam_sinh_new = splitDate(ngay_thang_nam_sinh)
  let ngay = calcExclude112233(parseInt(ngay_thang_nam_sinh_new[0]));
  let thang = calcExclude112233(parseInt(ngay_thang_nam_sinh_new[1]));
  let nam = calcExclude112233(parseInt(ngay_thang_nam_sinh_new[2]));
  let chang_1 = calcExclude112233(ngay + thang);
  let chang_2 = calcExclude112233(ngay+nam);
  let chang_3 = calcExclude112233(chang_1+chang_2);
  let chang_4 = calcExclude112233(thang+nam);
  return {chang_1, chang_2, chang_3, chang_4}
}

//17
const chi_so_thach_thuc = (ngay_thang_nam_sinh) => {
  let ngay_thang_nam_sinh_new = splitDate(ngay_thang_nam_sinh)
  let ngay = calcInclude112233(parseInt(ngay_thang_nam_sinh_new[0]));
  let thang = calcInclude112233(parseInt(ngay_thang_nam_sinh_new[1]));
  let nam = calcInclude112233(parseInt(ngay_thang_nam_sinh_new[2]));
  let thach_thuc_1 = calcExclude112233(Math.abs(ngay - thang));
  let thach_thuc_2 = calcExclude112233(Math.abs(ngay-nam));
  let thach_thuc_3 = calcExclude112233(Math.abs(thach_thuc_1-thach_thuc_2));
  let thach_thuc_4 = calcExclude112233(Math.abs(thang-nam));
  return {thach_thuc_1, thach_thuc_2, thach_thuc_3, thach_thuc_4}
}

const calcInclude112233 = (num) => {
  return calcNumFinal(num);
}

const calcExclude112233 = (num) => {
  if(num === 11 || num === 22 || num === 33) {
    return num;
  } else {
    return calcNumFinal(num);
  }
}

const splitNum = (num) => {
  return Array.from(String(num), Number);
}

const calcNum = (num) => {
  let nums = splitNum(num);
  // console.log(num, nums);
  let returnNum = 0;
  for(let i = 0; i < nums.length; i++) {
    returnNum += nums[i];
  }
  return returnNum;
}

const calcNumFinal = (num) => {

  if(num < 10) {
    return num;
  } else {
    let newNum = calcNum(num);
    return calcNumFinal(newNum);
  }
}

const getFirstLetters = (ho_va_ten) => {
  return ho_va_ten.toUpperCase().split(" ").map(word => word.charAt(0));
}

const calcByWord = (word) => {
  let letters = splitName(word);
  let num = 0;
  for(let i = 0; i < letters.length; i++) {
    // console.log(letters[i], char_num_map[letters[i]]);
    num += char_num_map[letters[i]];
  }
  num = calcExclude112233(num);
  return num;
}

const calcByWordFull = (word) => {
  let letters = splitName(word);
  let num = 0;
  for(let i = 0; i < letters.length; i++) {
    // console.log(letters[i], char_num_map[letters[i]]);
    num += char_num_map[letters[i]];
  }
  num = calcInclude112233(num);
  return num;
}

const filterNguyenAm = (ho_va_ten) => {
  let nguyenAm = "";
  let letters = splitName(ho_va_ten);
  for(let i = 0; i < letters.length; i++) {
    if(isNguyenAmWithoutY(letters[i]) || letters[i] === " ") {
      nguyenAm += letters[i];
    } else {
      if((letters[i] === "Y" && (i===0 || letters[i-1]===" ")) || (letters[i] === "Y" && (isNguyenAmWithoutY(letters[i-1]) || (i+1 < letters.length && isNguyenAmWithoutY(letters[i+1]))))) {
        continue;
      } else {
        if(letters[i] === "Y") nguyenAm += letters[i];
      }
    }
  }
  return nguyenAm;
}

const isNguyenAmWithoutY = (letter) => {
  if(letter === "A" || letter === "E" || letter === "I" || letter === "O" || letter === "U") {
    return true;
  }
  return false
}

const filterPhuAm = (ho_va_ten) => {
  let phuAm = "";
  let letters = splitName(ho_va_ten);
  for(let i = 0; i < letters.length; i++) {
    if(letters[i] === " ") {
      continue;
    } else {
      if((letters[i] === "Y" && (i===0 || letters[i-1]===" ")) || (letters[i] === "Y" && (isNguyenAmWithoutY(letters[i-1]) || (i+1 < letters.length && isNguyenAmWithoutY(letters[i+1]))))) {
        phuAm += letters[i];
      } else {
        if(letters[i] !== "Y" && !isNguyenAmWithoutY(letters[i])) phuAm += letters[i];
      }
    }
  }
  return phuAm;
}