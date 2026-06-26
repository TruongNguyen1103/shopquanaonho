package NguyenDangQuang;

import java.time.LocalDate;
import java.time.Period;

public class Advance6 {
    public int tinhTuoi(int ngay, int thang, int nam) {
        try {
            LocalDate ngaySinh = LocalDate.of(nam, thang, ngay);
            LocalDate ngayHienTai = LocalDate.now();
            if (ngaySinh.isAfter(ngayHienTai)) return -1;
            return Period.between(ngaySinh, ngayHienTai).getYears();
        } catch (Exception e) {
            return -1;
        }
    }
}
