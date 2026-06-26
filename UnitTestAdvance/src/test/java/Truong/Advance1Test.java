package Truong;

import NguyenDangQuang.Advance1;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q7 - Unit Test cho Advance1 (USCLN và BSCNN)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q7 - Advance1: USCLN và BSCNN")
class Advance1Test {

    Advance1 x;

    @BeforeEach
    void setUp() {
        x = new Advance1();
    }

    @Test
    @DisplayName("TC01 - USCLN(12, 8) → 4")
    void testUSCLN() {
        assertEquals(4, x.USCLN(12, 8), "USCLN(12, 8) phải bằng 4");
    }

    @Test
    @DisplayName("TC02 - BSCNN(4, 6) → 12")
    void testBSCNN() {
        assertEquals(12, x.BSCNN(4, 6), "BSCNN(4, 6) phải bằng 12");
    }

    @Test
    @DisplayName("TC03 - USCLN(a=0) → Vòng lặp vô tận, expect fail/exception")
    void testUSCLNWithZero() {
        // Theo yêu cầu PDF: test với a=0, expect fail (vòng lặp không dừng)
        // Dùng assertThrows hoặc kiểm tra không có kết quả hợp lệ
        try {
            // USCLN(0, 4) sẽ loop vô tận → không thể test trực tiếp
            // Ta ghi nhận đây là bug của hàm gốc
            assertEquals(12, x.USCLN(0, 4));
            fail("Hàm USCLN với a=0 không hoạt động đúng (vòng lặp vô tận là bug)");
        } catch (Exception e) {
            // Nếu bị exception thì test fail như mong đợi
            fail("Exception xảy ra: " + e.getMessage());
        }
        // Ghi chú: hàm gốc bị bug khi a=0, test này được đánh dấu là known bug
    }

    @Test
    @DisplayName("TC04 - BSCNN(b=0) → ArithmeticException (chia cho 0)")
    void testBSCNNWithBZero() {
        // BSCNN gọi USCLN → nếu b=0 sẽ gây lỗi chia cho 0
        assertThrows(ArithmeticException.class, () -> x.BSCNN(4, 0),
            "BSCNN với b=0 phải ném ArithmeticException");
    }

    @Test
    @DisplayName("TC05 - USCLN(a=-4) → Vòng lặp vô tận với số âm (bug)")
    void testUSCLNWithNegative() {
        // Số âm gây bug vòng lặp vô tận
        try {
            assertEquals(4, x.USCLN(-4, 8));
            fail("USCLN với số âm không hoạt động đúng (bug)");
        } catch (Exception e) {
            fail("Exception: " + e.getMessage());
        }
    }
}
