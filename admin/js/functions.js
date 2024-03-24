//!Class danh mục
class danh_muc {
  constructor(id, ten_danh_muc) {
    this.id = id;
    this.ten_danh_muc = ten_danh_muc;
  }
}

//!Class sản phẩm
class san_pham {
  constructor(id, id_danh_muc, id_loai, tên, giá, giảm, hình, ngày, hot = 0) {
    this.id = id;
    this.id_danh_muc = id_danh_muc;
    this.id_loai = id_loai;
    this.ten_sp = tên;
    this.gia = giá;
    this.giam_gia = giảm;
    this.hinh = hình;
    this.ngay = ngày;
    this.hot = hot;
  }
}

//!Class thuộc tính
class thuoc_tinh {
  constructor(id, id_sp, ram, dia, sim, blue_tooth, pin) {
    this.id = id;
    this.id_sp = id_sp;
    this.ram = ram;
    this.dia = dia;
    this.sim = sim;
    this.blue_tooth = blue_tooth;
    this.pin = pin;
  }
}

//! Pagination
let parPage = 10;
let currentPage = 1;

//! Table danh mục
const ds_danh_muc = () => {
  fetch("http://localhost:3000/danh_muc")
    .then((res) => res.json())
    .then((dm_arr) => {
      let str = ``;
      let stt = 1;
      let beginGet = parPage * (currentPage - 1);
      let endGet = parPage * currentPage - 1;
      dm_arr.forEach((dm, key) => {
        let { id, ten_danh_muc } = dm;
        let obj = new danh_muc(id, ten_danh_muc);
        if (key >= beginGet && key <= endGet) {
          str += `<tr>
              <td>${stt}</td>
              <td>${ten_danh_muc}</td>
              <td>
                <a href="./sua_dm.html?id=${id}" class="btn btn-update">Sửa</a>
                <button onclick="xoa_dm('${id}')" class="btn btn-delete">Xóa</button>
              </td>
            </tr>`;
        }
        stt++;
      });
      listPage();
      document.querySelector("#ds_danh_muc").innerHTML = `
      <a href="./them_dm.html" class="add_product">Thêm</a>
      <table id="example" class="table">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Tên sản phẩm</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="tbody">
          ${str}
        </tbody>
      </table>`;
    });
};

//! Table danh sách sản phẩm
const dssan_pham = () => {
  fetch(`http://localhost:3000/san_pham`)
    .then((res) => res.json())
    .then((sp_arr) => {
      let str = ``,
        stt = 1;
      let beginGet = parPage * (currentPage - 1);
      let endGet = parPage * currentPage - 1;
      sp_arr.forEach((sp, key) => {
        let {
          id,
          id_danh_muc,
          id_loai,
          ten_sp,
          gia,
          giam_gia,
          hinh,
          ngay,
          hot,
        } = sp;
        let obj = new san_pham(
          id,
          id_danh_muc,
          id_loai,
          ten_sp,
          gia,
          giam_gia,
          hinh,
          ngay,
          hot
        );
        if (key >= beginGet && key <= endGet) {
          str += tbody_table(obj, stt);
        }
        stt++;
      });
      listPage();
      document.querySelector("#ds_sanpham").innerHTML = `
      <a href="./them_sp.html" class="add_product">Thêm</a>
      <table id="example" class="table">
        <thead>
          <tr>
            <th>Stt</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Giảm Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody id="tbody">
          ${str}
        </tbody>
      </table>`;
    });
};

//! Pagination (Phân trang)
function listPage() {
  let count = Math.ceil(52 / parPage);
  document.querySelector("#pagination").innerHTML = "";

  if (currentPage != 1) {
    let prev = document.createElement("li");
    prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
    prev.setAttribute("onclick", `changePage(${currentPage - 1})`);
    document.querySelector("#pagination").appendChild(prev);
  }

  for (let i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == currentPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", `changePage(${i})`);
    document.querySelector("#pagination").appendChild(newPage);
  }

  if (currentPage != count) {
    let next = document.createElement("li");
    next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
    next.setAttribute("onclick", `changePage(${currentPage + 1})`);
    document.querySelector("#pagination").appendChild(next);
  }
}
function changePage(i) {
  currentPage = i;
  dssan_pham();
}

//! Hiện tbody
const tbody_table = (sp, stt) =>
  ` <tr>
      <td>${stt}</td>
      <td class='img-item'><img src=".${sp.hinh}" alt="" /></td>
      <td>
        <h4>${sp.ten_sp}</h4>
      </td>
      <td>
        <span class="price">${Number(sp.gia).toLocaleString("Vi")} VNĐ</span>
      </td>
      <td>${sp.giam_gia}</td>
      <td>
      <a href="./sua_sp.html?id=${sp.id}" class="btn btn-update">Sửa</a>
      <button onclick="xoa_sp('${sp.id}')" class="btn btn-delete">Xóa</button>
      </td>
    </tr>`;

//Thêm danh mục
const form_them_dm = () => {
  let str = `
  <div class="add_product">      
            <form action="" method="post" enctype="multipart/form-data">                
                <div class="group_input">
                    <label for="Ten_dm">Tên Danh Mục</label>
                    <input type="text" placeholder="Tên Danh Mục" name="Ten_dm" id="ten_dm">
                    <div class="error"></div>
                </div>
                <div class="group_btn">
                    <button type="submit" class="btn" onclick="them_dm()">Thêm</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
  document.querySelector("#them_dm").innerHTML = str;
};

//! Thêm danh mục
const them_dm = () => {
  let them_dm = new Promise((thongbao, loi) => {
    let ten_dm = document.getElementById("ten_dm").value;

    if (ten_dm == "") {
      document.querySelector(".error").innerHTML =
        "Vui lý điền đầy đủ thông tin";
      return;
    }

    let data = {
      ten_danh_muc: ten_dm,
    };

    let opt = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/danh_muc`, opt)
      .then((res) => res.json())
      .then((dm) => thongbao(dm))
      .catch((err) => loi(err));
  });

  them_dm.then(
    function thongbao(dm) {
      location.href = "ds_danhmuc.html";
    },
    function loi(err) {
      location.href = "them_dm.html";
    }
  );
};

//! Sửa danh mục
const form_sua_dm = (id_danh_muc) => {
  fetch(`http://localhost:3000/danh_muc/${id_danh_muc}`)
    .then((res) => res.json())
    .then((dm) => {
      document.getElementById("ten_dm").value = dm.ten_danh_muc;
    })
    .catch((err) => {
      console.error("Lỗi khi lấy dữ liệu danh mục từ server: ", err);
    });
  let str = `
  <div class="add_product">      
            <form>                
                <div class="group_input">
                    <label for="Ten_dm">Tên Danh Mục</label>
                    <input type="text" placeholder="Tên Danh Mục" name="Ten_dm" id="ten_dm">
                    <div class="error"></div>
                </div>
                <div class="group_btn">
                    <button type="button" class="btn" onclick="update_dm('${id_danh_muc}')">Cập nhật</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
  document.querySelector("#sua_dm").innerHTML = str;
};

//! Sửa danh mục
const update_dm = (id_danh_muc) => {
  let ten_dm = document.getElementById("ten_dm").value;

  if (ten_dm == "") {
    document.querySelector(".error").innerHTML = "Vui lý nhập tên danh mục";
    return;
  }
  let data = {
    id: id_danh_muc,
    ten_danh_muc: ten_dm,
  };
  let opt = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`http://localhost:3000/danh_muc/${id_danh_muc}`, opt)
    .then((res) => res.json())
    .then((dm) => {
      location.href = "ds_danhmuc.html";
    });
};

//!Xóa danh mục
const xoa_dm = async (id_danh_muc) => {
  //?Kiểm tra xem người dùng muốn xóa hay không
  if (!confirm("Bạn có chắc muốn xóa danh mục này?")) {
    return;
  }

  await fetch(`http://localhost:3000/danh_muc/${id_danh_muc}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((dm) => {
      confirm("Bạn đã xóa danh mục này!");
    });
};

//! Thêm sản phẩm
const form_them_sp = () => {
  //? Yêu cầu fetch danh mục
  fetch("http://localhost:3000/danh_muc")
    .then((res) => res.json())
    .then((dm_arr) => {
      let ten_dm = ``;
      dm_arr.forEach((dm) => {
        let { id, ten_danh_muc } = dm;
        ten_dm += `<option value="${id}" id="danh_muc_${id}">${ten_danh_muc}</option>`;
      });
      //? Lưu danh mục và yêu cầu fetch loại
      fetch("http://localhost:3000/loai")
        .then((res) => res.json())
        .then((loai_arr) => {
          let str = `
  <div class="add_product">      
            <form action="" method="post" enctype="multipart/form-data">
                <div class="group_input">
                    <label for="topic-name">Danh mục</label>
                        <select name="danh_muc" id="danh_muc_select">
                            ${ten_dm}
                        </select>
                </div>
                <div class="group_input">
                    <label for="topic-name">Loại</label>
                        <select name="loai" id="loai_select">
                            ${loai_arr.map((loai) => {
                              return `<option value="${loai.id}" id="loai_${loai.id}">${loai.ten_loai}</option>`;
                            })}
                        </select>
                </div>
                <div class="group_input">
                    <label for="Ten_sp">Tên Sản Phẩm</label>
                    <input type="text" placeholder="Tên Sản Phẩm" name="Ten_sp" id="ten_sp">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="Gia_sp">Giá Sản Phẩm</label>
                    <input type="text" placeholder="Giá Sản Phẩm" name="Gia_sp" id="gia_sp">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="giam_gia">Giảm Giá</label>
                    <input type="text" placeholder="Giảm Giá" name="giam_gia" id="giam_gia">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="Hinh">Hình Ảnh</label>
                    <input type="text" placeholder="Hình Sản Phẩm" name="Hinh" id="hinh">
                    <div class="error"></div>
                </div>
                 <div class="group_input">
                    <label for="ngay">Ngày</label>
                    <input type="date" placeholder="Ngày" name="ngay" id="ngay">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="mau_sac">Màu Sắc</label>
                    <input type="text" placeholder="Màu Sắc" name="mau_sac" id="mau_sac">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="hot">Hot</label>
                     <select name="hot" id="hot_select">
                            <option value="1" id="hot_1">Có</option>
                            <option value="0" id="hot_0">Không</option>
                        </select>
                </div>
                <div class="group_btn">
                    <button type="submit" class="btn" onclick="them_sp()">Thêm</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
          document.querySelector("#them_sp").innerHTML = str;
        });
    });
};

//! Xu ly them san pham
const them_sp = () => {
  let them_sp = new Promise((thongbao, loi) => {
    let danh_muc = document.getElementById("danh_muc_select").value;
    let loai = document.getElementById("loai_select").value;
    let ten_sp = document.getElementById("ten_sp").value;
    let gia_sp = document.getElementById("gia_sp").value;
    let giam_gia = document.getElementById("giam_gia").value;
    let hinh = document.getElementById("hinh").value;
    let ngay = document.getElementById("ngay").value;
    let mau_sac = document.getElementById("mau_sac").value;
    let hot = document.getElementById("hot_select").value;

    let data = {
      id_danh_muc: danh_muc,
      id_loai: loai,
      ten_sp: ten_sp,
      gia: gia_sp,
      giam_gia: giam_gia,
      hinh: hinh,
      ngay: ngay,
      mau_sac: mau_sac,
      hot: hot,
    };
    let opt = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/san_pham`, opt)
      .then((res) => res.json())
      .then((sp) => thongbao(sp))
      .catch((err) => loi(err));
  });

  them_sp.then(
    function thongbao(sp) {
      location.href = "ds_sanpham.html";
    },
    function loi(err) {
      location.href = "404.html";
    }
  );
};

//! Sửa sản phẩm
const form_sua_sp = (id) => {
  fetch(`http://localhost:3000/san_pham/${id}`)
    .then((res) => res.json())
    .then((sp) => {
      fetch(`http://localhost:3000/danh_muc/${sp.id_danh_muc}`)
        .then((res) => res.json())
        .then((dm) => {
          let ten_dm = dm.ten_danh_muc;
          fetch(`http://localhost:3000/loai/${sp.id_loai}`)
            .then((res) => res.json())
            .then((loai) => {
              let ten_loai = loai.ten_loai;
              let str = `
              <div class="add_product">      
              <form action="" method="post" enctype="multipart/form-data">   
                <div class="group_input">
                    <label for="danh_muc">Danh Mục</label>
                    <input type="text" placeholder="Danh Mục" name="Ten_sp" id="danh_muc" value="${ten_dm}">
                    <div class="error"></div>
                    </div>
                <div class="group_input">
                    <label for="loai">Loại</label>
                    <input type="text" placeholder="Loại" name="Ten_sp" id="loai" value="${ten_loai}">
                    <div class="error"></div>
                    </div>
                    <div class="group_input">
                    <label for="Ten_sp">Tên Sản Phẩm</label>
                    <input type="text" placeholder="Tên Sản Phẩm" name="Ten_sp" id="ten_sp" value="${sp.ten_sp}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="Gia_sp">Giá Sản Phẩm</label>
                    <input type="text" placeholder="Giá Sản Phẩm" name="Gia_sp" id="gia_sp" value="${sp.gia}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="giam_gia">Giảm Giá</label>
                    <input type="text" placeholder="Giảm Giá" name="giam_gia" id="giam_gia" value="${sp.giam_gia}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="Hinh">Hình Ảnh</label>
                    <input type="text" placeholder="Hình Sản Phẩm" name="Hinh" id="hinh" value="${sp.hinh}">
                    <div class="error"></div>
                </div>
                 <div class="group_input">
                    <label for="ngay">Ngày</label>
                    <input type="date" placeholder="Ngày" name="ngay" id="ngay" value="${sp.ngay}">
                    <div class="error"></div>
                </div>
                <div class="group_input">
                    <label for="mau_sac">Màu Sắc</label>
                    <input type="text" placeholder="Màu Sắc" name="mau_sac" id="mau_sac" value="${sp.mau_sac}">
                    <div class="error"></div>
                </div>
                <div class="group_btn">
                    <button type="submit" class="btn" onclick="update_sp('${id}')">Cập nhật</button>
                    <button type="reset" class="btn btntp">Nhập Lại</button>
                </div>
            </form>
    </div>
  `;
              document.querySelector("#sua_sp").innerHTML = str;
            });
        });
    });
};

//! Sửa sản phẩm
const update_sp = (id) => {
  let id_danh_muc = document.getElementById("danh_muc").value;
  let loai = document.getElementById("loai").value;
  let ten_sp = document.getElementById("ten_sp").value;
  let gia_sp = document.getElementById("gia_sp").value;
  let giam_gia = document.getElementById("giam_gia").value;
  let hinh = document.getElementById("hinh").value;
  let ngay = document.getElementById("ngay").value;
  let mau_sac = document.getElementById("mau_sac").value;

  let data = {
    id: id,
    id_danh_muc: id_danh_muc,
    id_loai: loai,
    ten_sp: ten_sp,
    gia: gia_sp,
    giam_gia: giam_gia,
    hinh: hinh,
    ngay: ngay,
    mau_sac: mau_sac,
  };

  let opt = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`http://localhost:3000/san_pham/${id}`, opt)
    .then((res) => res.json())
    .then((sp) => {
      location.href = "ds_sanpham.html";
    });
};

//! Xóa sản phẩm
const xoa_sp = async (id) => {
  //? Kiểm tra xem người dùng muốn xóa hay không
  if (!confirm("Bạn có chắc muốn xóa sản phẩm")) {
    return;
  }

  await fetch(`http://localhost:3000/san_pham/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((sp) => {
      confirm("Sản phẩm đã được xóa!");
    });
};
