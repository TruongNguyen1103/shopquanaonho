package Truong;

import NguyenDangQuang.Triangle;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q6 - Unit Test cho Triangle (cạnh lớn nhất tam giác)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q6 - Triangle: Tìm cạnh lớn nhất của tam giác")
class TriangleTest {

    @Test
    @DisplayName("TC01 - Cạnh 1 lớn nhất: Triangle(9, 4, 1) → 9")
    void testFirstNumberIsMax() {
        Triangle x = new Triangle(9, 4, 1);
        assertTrue(x.getNumber1() >= x.getNumber2() && x.getNumber1() > x.getNumber3(),
            "number1 phải lớn hơn hoặc bằng number2 và lớn hơn number3");
        assertEquals(9, x.maxLength(), "Cạnh lớn nhất phải là 9");
    }

    @Test
    @DisplayName("TC02 - Cạnh 2 lớn nhất: Triangle(3, 10, 6) → 10")
    void testSecondNumberIsMax() {
        Triangle x = new Triangle(3, 10, 6);
        assertEquals(10, x.maxLength(), "Cạnh lớn nhất phải là 10");
    }

    @Test
    @DisplayName("TC03 - Cạnh 3 lớn nhất: Triangle(2, 5, 12) → 12")
    void testThirdNumberIsMax() {
        Triangle x = new Triangle(2, 5, 12);
        assertEquals(12, x.maxLength(), "Cạnh lớn nhất phải là 12");
    }
}
