package Truong;

import NguyenDangQuang.Advance4;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q10 - Unit Test cho Advance4 (Kiểm tra số nguyên tố)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q10 - Advance4: Kiểm tra số nguyên tố")
class Advance4Test {

    Advance4 x;

    @BeforeEach
    void setUp() {
        x = new Advance4();
    }

    @Test
    @DisplayName("TC01 - isPrimeNumber(7) → true (số nguyên tố)")
    void testIsPrimeNumber() {
        assertTrue(x.isPrimeNumber(7), "7 là số nguyên tố");
    }

    @Test
    @DisplayName("TC02 - isPrimeNumber(2) → true (số nguyên tố nhỏ nhất)")
    void testIsPrimeNumberSmallest() {
        assertTrue(x.isPrimeNumber(2), "2 là số nguyên tố nhỏ nhất");
    }

    @Test
    @DisplayName("TC03 - isPrimeNumber(6) → false (không phải số nguyên tố)")
    void testIsNotPrimeNumber() {
        assertFalse(x.isPrimeNumber(6), "6 không phải số nguyên tố");
    }

    @Test
    @DisplayName("TC04 - isPrimeNumber(-3) → false (số âm)")
    void testIsPrimeNumberNegative() {
        assertFalse(x.isPrimeNumber(-3), "Số âm không phải số nguyên tố");
    }

    @Test
    @DisplayName("TC05 - isPrimeNumber(1) → false (1 không phải số nguyên tố)")
    void testIsPrimeNumberOne() {
        assertFalse(x.isPrimeNumber(1), "1 không phải số nguyên tố");
    }
}
