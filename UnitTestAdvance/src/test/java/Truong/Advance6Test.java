package Truong;

import NguyenDangQuang.Advance6;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q12 - Unit Test cho Advance6 (Tính tuổi theo ngày sinh)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 * Lưu ý: Test tuổi phụ thuộc vào ngày chạy test, dùng khoảng tuổi hợp lý
 */
@DisplayName("Q12 - Advance6: Tính tuổi theo ngày sinh")
class Advance6Test {

    Advance6 x;

    @BeforeEach
    void setUp() {
        x = new Advance6();
    }

    @Test
    @DisplayName("TC01 - tinhTuoi(12, 1, 1999) → tuổi > 20 (hợp lệ)")
    void testTinhTuoi() {
        int tuoi = x.tinhTuoi(12, 1, 1999);
        assertTrue(tuoi > 20 && tuoi < 100,
            "Người sinh 12/1/1999 phải có tuổi hợp lý (>20)");
    }

    @Test
    @DisplayName("TC02 - tinhTuoi(12, 1, 2030) → -1 (ngày sinh trong tương lai)")
    void testTinhTuoiFutureDateReturnsMinusOne() {
        assertEquals(-1, x.tinhTuoi(12, 1, 2030),
            "Ngày sinh trong tương lai phải trả về -1");
    }

    @Test
    @DisplayName("TC03 - tinhTuoi(-12, 1, 2000) → -1 (ngày âm không hợp lệ)")
    void testTinhTuoiNegativeDayReturnsMinusOne() {
        assertEquals(-1, x.tinhTuoi(-12, 1, 2000),
            "Ngày âm phải trả về -1");
    }

    @Test
    @DisplayName("TC04 - tinhTuoi(12, -1, 2000) → -1 (tháng âm không hợp lệ)")
    void testTinhTuoiNegativeMonthReturnsMinusOne() {
        assertEquals(-1, x.tinhTuoi(12, -1, 2000),
            "Tháng âm phải trả về -1");
    }

    @Test
    @DisplayName("TC05 - tinhTuoi(12, 1, -2030) → -1 (năm âm không hợp lệ)")
    void testTinhTuoiNegativeYearReturnsMinusOne() {
        assertEquals(-1, x.tinhTuoi(12, 1, -2030),
            "Năm âm phải trả về -1");
    }
}
