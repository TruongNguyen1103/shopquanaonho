package NguyenDangQuang;

import java.util.Calendar;

public class Advance7 {
    public int tinhThu(int ngay, int thang, int nam) {
        try {
            if (ngay <= 0 || thang <= 0 || thang > 12 || nam <= 0) return 0;
            Calendar cal = Calendar.getInstance();
            cal.setLenient(false);
            cal.set(nam, thang - 1, ngay);
            cal.getTime(); // trigger validation
            return cal.get(Calendar.DAY_OF_WEEK);
        } catch (Exception e) {
            return 0;
        }
    }
}
