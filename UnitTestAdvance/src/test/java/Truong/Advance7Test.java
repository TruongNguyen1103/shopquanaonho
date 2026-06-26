package Truong;

import NguyenDangQuang.Advance7;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q13 - Unit Test cho Advance7 (Tính thứ trong tuần)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 * Calendar.DAY_OF_WEEK: 1=CN, 2=T2, 3=T3, ..., 7=T7
 */
@DisplayName("Q13 - Advance7: Tính thứ trong tuần theo ngày tháng năm")
class Advance7Test {

    Advance7 x;

    @BeforeEach
    void setUp() {
        x = new Advance7();
    }

    @Test
    @DisplayName("TC01 - tinhThu(5, 4, 2020) → 1 (Chủ nhật)")
    void testTinhThu5April2020() {
        assertEquals(1, x.tinhThu(5, 4, 2020),
            "5/4/2020 là Chủ Nhật → DAY_OF_WEEK = 1");
    }

    @Test
    @DisplayName("TC02 - tinhThu(6, 4, 2020) → 2 (Thứ Hai)")
    void testTinhThu6April2020() {
        assertEquals(2, x.tinhThu(6, 4, 2020),
            "6/4/2020 là Thứ Hai → DAY_OF_WEEK = 2");
    }

    @Test
    @DisplayName("TC03 - tinhThu(35, 6, 2019) → 0 (ngày 35 không hợp lệ)")
    void testTinhThuInvalidDay35() {
        assertEquals(0, x.tinhThu(35, 6, 2019),
            "Ngày 35 không tồn tại → trả về 0");
    }

    @Test
    @DisplayName("TC04 - tinhThu(19, 35, 2020) → 0 (tháng 35 không hợp lệ)")
    void testTinhThuInvalidMonth35() {
        assertEquals(0, x.tinhThu(19, 35, 2020),
            "Tháng 35 không tồn tại → trả về 0");
    }

    @Test
    @DisplayName("TC05 - tinhThu(-19, 35, 2020) → 0 (ngày âm không hợp lệ)")
    void testTinhThuNegativeDay() {
        assertEquals(0, x.tinhThu(-19, 35, 2020),
            "Ngày âm → trả về 0");
    }

    @Test
    @DisplayName("TC06 - tinhThu(19, -9, 2020) → 0 (tháng âm không hợp lệ)")
    void testTinhThuNegativeMonth() {
        assertEquals(0, x.tinhThu(19, -9, 2020),
            "Tháng âm → trả về 0");
    }

    @Test
    @DisplayName("TC07 - tinhThu(19, 9, -2020) → 0 (năm âm không hợp lệ)")
    void testTinhThuNegativeYear() {
        assertEquals(0, x.tinhThu(19, 9, -2020),
            "Năm âm → trả về 0");
    }
}
