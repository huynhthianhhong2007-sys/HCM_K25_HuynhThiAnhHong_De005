let employees = [
    {
        employeeCode: "EMP-001",
        fullName: "Ngô Thanh Tùng",
        department: "Phòng Kỹ Thuật",
        age: 28,
        experienceYears: 5
    },
    {
        employeeCode: "EMP-002",
        fullName: "Hồ Thị Thu",
        department: "Phòng Nhân Sự",
        age: 35,
        experienceYears: 10
    },
    {
        employeeCode: "EMP-003",
        fullName: "Mai Quốc Việt",
        department: "Phòng Kỹ Thuật",
        age: 24,
        experienceYears: 1
    }
];

function findEmployeeIndex(code) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode === code) {
            return i;
        }
    }
    return -1;
}

function normalizeText(text) {
    return text.trim().split(/\s+/).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(" ");
}

function inputNumber(message, min, max) {
    while (true) {
        let number = prompt(message);

        if (number === null) {
            return null;
        }

        number = number.trim();

        if (number === "" || !Number.isInteger(Number(number))) {
            console.log("Vui lòng nhập số nguyên");
            continue;
        }

        number = Number(number);

        if (number < min || number > max) {
            console.log(`Vui lòng nhập từ ${min} đến ${max}`);
            continue;
        }

        return number;
    }
}

function displayEmployees(list) {
    if (list.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }

    for (let i = 0; i < list.length; i++) {
        console.log(`${i + 1}. ${list[i].employeeCode} - ${list[i].fullName}`);
        console.log(`Phòng ban: ${list[i].department}`);
        console.log(`Tuổi: ${list[i].age}`);
        console.log(`Kinh nghiệm: ${list[i].experienceYears} năm`);
        console.log("----------------------------------------");
    }

    console.log(`Tổng số nhân viên: ${list.length}`);
}

function showMenu() {
    console.log("========================================");
    console.log("QUẢN LÝ NHÂN VIÊN SKYTECH");
    console.log("========================================");
    console.log("1. Hiển thị danh sách nhân viên");
    console.log("2. Thêm nhân viên");
    console.log("3. Cập nhật nhân viên");
    console.log("4. Xóa nhân viên");
    console.log("5. Tìm kiếm theo phòng ban");
    console.log("0. Thoát chương trình");
    console.log("========================================");
}

function showEmployees() {
    displayEmployees(employees);
}

function addEmployee() {
    let code = prompt("Nhập mã nhân viên");

    if (code === null) {
        return;
    }

    code = code.trim().toUpperCase();

    if (code === "") {
        console.log("Mã nhân viên không được để trống");
        return;
    }

    if (code.length < 6 || !code.startsWith("EMP-") || /\s/.test(code)) {
        console.log("Mã nhân viên không hợp lệ");
        return;
    }

    if (findEmployeeIndex(code) !== -1) {
        console.log("Mã nhân viên đã tồn tại");
        return;
    }

    let fullName = prompt("Nhập họ tên");

    if (fullName === null) {
        return;
    }

    fullName = normalizeText(fullName);

    if (fullName === "") {
        console.log("Họ tên không được để trống");
        return;
    }

    let department = prompt("Nhập phòng ban");

    if (department === null) {
        return;
    }

    department = normalizeText(department);

    if (department === "") {
        console.log("Phòng ban không được để trống");
        return;
    }

    let age = inputNumber("Nhập tuổi từ 18 đến 60", 18, 60);

    if (age === null) {
        return;
    }

    let experienceYears = inputNumber(
        "Nhập số năm kinh nghiệm từ 0 đến 40",
        0,
        40
    );

    if (experienceYears === null) {
        return;
    }

    let newEmployee = {
        employeeCode: code,
        fullName: fullName,
        department: department,
        age: age,
        experienceYears: experienceYears
    };

    employees.push(newEmployee);

    console.log("Thêm nhân viên thành công");
    displayEmployees([newEmployee]);
}

function updateEmployee() {
    let code = prompt("Nhập mã nhân viên cần cập nhật");

    if (code === null) {
        return;
    }

    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy nhân viên");
        return;
    }

    let age = inputNumber("Nhập tuổi mới từ 18 đến 60", 18, 60);

    if (age === null) {
        return;
    }

    let experienceYears = inputNumber(
        "Nhập số năm kinh nghiệm mới từ 0 đến 40",
        0,
        40
    );

    if (experienceYears === null) {
        return;
    }

    employees[index].age = age;
    employees[index].experienceYears = experienceYears;

    console.log("Cập nhật nhân viên thành công");
    displayEmployees([employees[index]]);
}

function deleteEmployee() {
    let code = prompt("Nhập mã nhân viên cần xóa");

    if (code === null) {
        return;
    }

    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log("Không tìm thấy nhân viên");
        return;
    }

    let confirmDelete = prompt("Bạn có chắc chắn muốn xóa? (Y/N)");

    if (confirmDelete === null || confirmDelete.trim().toUpperCase() !== "Y") {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    employees.splice(index, 1);

    console.log("Xóa nhân viên thành công");
    console.log(`Còn ${employees.length} nhân viên`);
}

function searchEmployeeByDepartment() {
    let keyword = prompt("Nhập phòng ban cần tìm");

    if (keyword === null || keyword.trim() === "") {
        console.log("Từ khóa không được để trống");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = [];

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].department.toLowerCase().includes(keyword)) {
            result.push(employees[i]);
        }
    }

    if (result.length === 0) {
        console.log("Không tìm thấy nhân viên");
    } else {
        console.log("Kết quả tìm kiếm:");
        displayEmployees(result);
    }
}

function showMenu() {
    console.log("========================================");
    console.log("HỆ THỐNG QUẢN LÝ NHÂN VIÊN SKYTECH");
    console.log("========================================");
    console.log("1. Hiển thị danh sách nhân viên");
    console.log("2. Thêm nhân viên mới");
    console.log("3. Cập nhật thông tin nhân viên");
    console.log("4. Xóa nhân viên");
    console.log("5. Tìm kiếm nhân viên theo phòng ban");
    console.log("0. Thoát chương trình");
    console.log("========================================");
}

function main() {
    let choice;

    do {
        showMenu();

        choice = prompt("Nhập lựa chọn của bạn (0 - 5)");

        if (choice === null) {
            choice = "";
            continue;
        }

        switch (choice.trim()) {
            case "1":
                showEmployees();
                break;

            case "2":
                addEmployee();
                break;

            case "3":
                updateEmployee();
                break;

            case "4":
                deleteEmployee();
                break;

            case "5":
                searchEmployeeByDepartment();
                break;

            case "0":
                console.log("Cảm ơn bạn đã sử dụng chương trình!");
                break;

            default:
                console.log("Lựa chọn không hợp lệ!");
                break;
        }
    } while (choice.trim() !== "0");
}

main();