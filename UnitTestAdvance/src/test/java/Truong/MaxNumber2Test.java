package Truong;

import NguyenDangQuang.MaxNumber2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q3 - Unit Test cho MaxNumber2
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q3 - MaxNumber2: Tìm số lớn hơn trong 2 số")
class MaxNumber2Test {

    @Test
    @DisplayName("TC01 - Số thứ nhất lớn hơn: max2(10, 5) → 10")
    void testFirstNumberIsGreater() {
        MaxNumber2 finder = new MaxNumber2(10, 5);
        assertEquals(10, finder.max2(), "number1 lớn hơn number2 phải trả về number1");
    }

    @Test
    @DisplayName("TC02 - Số thứ hai lớn hơn: max2(5, 10) → 10")
    void testSecondNumberIsGreater() {
        MaxNumber2 finder = new MaxNumber2(5, 10);
        assertEquals(10, finder.max2(), "number2 lớn hơn number1 phải trả về number2");
    }

    @Test
    @DisplayName("TC03 - Hai số bằng nhau: max2(7, 7) → 7")
    void testBothNumbersEqual() {
        MaxNumber2 finder = new MaxNumber2(7, 7);
        assertEquals(7, finder.max2(), "Hai số bằng nhau phải trả về 7");
    }
}
