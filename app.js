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

// Chuẩn hóa mã nhân viên
function validateEmployeeCode(code) {
    if (code === "") {
        return "Chưa nhập mã nhân viên";
    }

    if (code.length < 6) {
        return "Độ dài nhỏ hơn 6 ký tự";
    }

    if (!code.startsWith("EMP-")) {
        return 'Sai tiền tố "EMP-"';
    }

    if (/\s/.test(code)) {
        return "Mã nhân viên không được chứa khoảng trắng";
    }

    if (findEmployeeIndex(code) !== -1) {
        return "Mã nhân viên đã tồn tại";
    }

    return "";
}

// Tìm vị trí nhân viên theo mã
function findEmployeeIndex(code) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeCode === code) {
            return i;
        }
    }

    return -1;
}

// Chuẩn hóa chuỗi
function normalizeText(rawText) {
    return rawText
        .trim()
        .split(/\s+/)
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(" ");
}

// Nhập số nguyên trong khoảng cho phép
function inputIntegerInRange(message, min, max) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        input = input.trim();

        if (input === "") {
            console.log("Lỗi: Chưa nhập, nhập lại");
            continue;
        }

        let number = Number(input);

        if (!Number.isInteger(number)) {
            console.log("Lỗi: Không phải số nguyên, nhập lại");
            continue;
        }

        if (number < min || number > max) {
            console.log(`Lỗi: Ngoài phạm vi ${min} - ${max}, nhập lại`);
            continue;
        }

        return number;
    }
}

// Hiển thị danh sách nhân viên
function displayEmployees(list) {
    if (list.length === 0) {
        console.log("Danh sách nhân viên trống");
        return;
    }

    for (let i = 0; i < list.length; i++) {
        console.log(
            `${i + 1}. ${list[i].employeeCode} - ${list[i].fullName} - ${list[i].department}`
        );

        console.log(
            `Tuổi: ${list[i].age} | Số năm kinh nghiệm: ${list[i].experienceYears}`
        );
    }

    console.log(`Tổng: ${list.length} nhân viên`);
}

// Hiển thị menu
function showMenu() {
    console.log("========================================");
    console.log("HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH");
    console.log("========================================");
    console.log("1. Hiển thị danh sách nhân viên");
    console.log("2. Thêm nhân viên mới");
    console.log("3. Cập nhật thông tin nhân viên");
    console.log("4. Xóa nhân viên");
    console.log("5. Tìm kiếm nhân viên theo phòng ban");
    console.log("0. Thoát chương trình");
    console.log("========================================");
}

// Case 1: Hiển thị danh sách
function showEmployees() {
    displayEmployees(employees);
}

// Case 2: Thêm nhân viên
function addEmployee() {
    let code = prompt("Nhập mã nhân viên");

    if (code === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    code = code.trim().toUpperCase();

    let error = validateEmployeeCode(code);

    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }

    let fullName = prompt("Nhập họ tên");

    if (fullName === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    fullName = normalizeText(fullName);

    while (fullName === "") {
        console.log("Họ tên không được để trống");

        fullName = prompt("Nhập lại họ tên");

        if (fullName === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        fullName = normalizeText(fullName);
    }

    let department = prompt("Nhập phòng ban");

    if (department === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    department = normalizeText(department);

    while (department === "") {
        console.log("Phòng ban không được để trống");

        department = prompt("Nhập lại phòng ban");

        if (department === null) {
            console.log("Đã hủy thao tác thêm");
            return;
        }

        department = normalizeText(department);
    }

    let age = inputIntegerInRange("Nhập tuổi (18 - 60)", 18, 60);

    if (age === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let experienceYears = inputIntegerInRange(
        "Nhập số năm kinh nghiệm (0 - 40)",
        0,
        40
    );

    if (experienceYears === null) {
        console.log("Đã hủy thao tác thêm");
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

// Case 3: Cập nhật nhân viên
function updateEmployee() {
    let code = prompt("Nhập mã nhân viên cần cập nhật");

    if (code === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log(`Không tìm thấy nhân viên có mã ${code}`);
        return;
    }

    let oldAge = employees[index].age;
    let oldExperience = employees[index].experienceYears;

    let newAge = inputIntegerInRange("Nhập tuổi mới (18 - 60)", 18, 60);

    if (newAge === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    let newExperience = inputIntegerInRange(
        "Nhập số năm kinh nghiệm mới (0 - 40)",
        0,
        40
    );

    if (newExperience === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    employees[index].age = newAge;
    employees[index].experienceYears = newExperience;

    console.log("Cập nhật thành công");

    console.log(`Tuổi: ${oldAge} -> ${newAge}`);
    console.log(`Số năm kinh nghiệm: ${oldExperience} -> ${newExperience}`);
}

// Case 4: Xóa nhân viên
function deleteEmployee() {
    let code = prompt("Nhập mã nhân viên cần xóa");

    if (code === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    code = code.trim().toUpperCase();

    let index = findEmployeeIndex(code);

    if (index === -1) {
        console.log(`Không tìm thấy nhân viên có mã ${code}`);
        return;
    }

    let confirmDelete = prompt("Bạn có chắc chắn muốn xóa? (Y/N)");

    if (confirmDelete === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    confirmDelete = confirmDelete.trim().toUpperCase();

    if (confirmDelete !== "Y") {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    employees.splice(index, 1);

    console.log("Xóa thành công");
    console.log(`Còn ${employees.length} nhân viên`);
}

// Case 5: Tìm kiếm theo phòng ban
function searchEmployeeByDepartment() {
    let keyword = prompt("Nhập từ khóa tìm kiếm phòng ban");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
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
        console.log("Không tìm thấy nhân viên phù hợp");
    } else {
        console.log("Kết quả tìm kiếm:");
        displayEmployees(result);
    }
}

// Chương trình chính
function main() {
    let choice;

    do {
        showMenu();

        choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5)");

        if (choice === null) {
            console.log("Vui lòng chọn 0 để thoát chương trình");
            continue;
        }

        choice = choice.trim();

        switch (choice) {
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
                console.log("Lựa chọn không hợp lệ");
                break;
        }
    } while (choice !== "0");
}

main();