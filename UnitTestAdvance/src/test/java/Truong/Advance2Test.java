package Truong;

import NguyenDangQuang.Advance2;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q8 - Unit Test cho Advance2 (Tính tổng các chữ số)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q8 - Advance2: Tổng các chữ số của một số")
class Advance2Test {

    Advance2 x;

    @BeforeEach
    void setUp() {
        x = new Advance2();
    }

    @Test
    @DisplayName("TC01 - sum(5765) → 5+7+6+5 = 23")
    void testSum() {
        assertEquals(23, x.sum(5765), "Tổng các chữ số của 5765 phải là 23");
    }

    @Test
    @DisplayName("TC02 - sum(-123) → Số âm: hàm xử lý phần dương")
    void testSumWithNegativeNumber() {
        // Với số âm, vòng lặp vẫn chạy vì -123 != 0
        // -123 % 10 = -3, -12 % 10 = -2, -1 % 10 = -1 → sum = -6
        int result = x.sum(-123);
        assertEquals(-6, result,
            "sum(-123) với số âm: Java trả về -6 (phần dư mang dấu âm)");
    }

    @Test
    @DisplayName("TC03 - sum(0) → 0")
    void testSumWithZero() {
        assertEquals(0, x.sum(0), "Tổng các chữ số của 0 phải là 0");
    }
}
