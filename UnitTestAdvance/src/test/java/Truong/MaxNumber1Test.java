package Truong;

import NguyenDangQuang.MaxNumber1;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q2 - Unit Test cho MaxNumber1
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q2 - MaxNumber1: Tìm số lớn nhất trong 3 số")
class MaxNumber1Test {

    MaxNumber1 finder;

    @BeforeEach
    void setUp() {
        finder = new MaxNumber1();
    }

    @Test
    @DisplayName("TC01 - Số thứ nhất lớn nhất: 10, 5, 3 → 10")
    void testFirstNumberIsMax() {
        finder.setNumber1(10);
        finder.setNumber2(5);
        finder.setNumber3(3);
        assertEquals(10, finder.max3(), "Trường hợp số thứ nhất lớn nhất");
    }

    @Test
    @DisplayName("TC02 - Số thứ hai lớn nhất: 5, 10, 3 → 10")
    void testSecondNumberIsMax() {
        finder.setNumber1(5);
        finder.setNumber2(10);
        finder.setNumber3(3);
        assertEquals(10, finder.max3(), "Trường hợp số thứ hai lớn nhất");
    }

    @Test
    @DisplayName("TC03 - Số thứ ba lớn nhất: 5, 3, 10 → 10")
    void testThirdNumberIsMax() {
        finder.setNumber1(5);
        finder.setNumber2(3);
        finder.setNumber3(10);
        assertEquals(10, finder.max3(), "Trường hợp số thứ ba lớn nhất");
    }

    @Test
    @DisplayName("TC04 - Số 1 bằng số 2, lớn hơn số 3: 10, 10, 5 → 10")
    void testNumber1EqualsNumber2() {
        finder.setNumber1(10);
        finder.setNumber2(10);
        finder.setNumber3(5);
        assertEquals(10, finder.max3(), "Số 1 bằng số 2, cả hai lớn hơn số 3");
    }

    @Test
    @DisplayName("TC05 - Số 2 bằng số 3, lớn hơn số 1: 5, 10, 10 → 10")
    void testNumber2EqualsNumber3() {
        finder.setNumber1(5);
        finder.setNumber2(10);
        finder.setNumber3(10);
        assertEquals(10, finder.max3(), "Số 2 bằng số 3, cả hai lớn hơn số 1");
    }

    @Test
    @DisplayName("TC06 - Số 1 bằng số 3, lớn hơn số 2: 10, 5, 10 → 10")
    void testNumber1EqualsNumber3() {
        finder.setNumber1(10);
        finder.setNumber2(5);
        finder.setNumber3(10);
        assertEquals(10, finder.max3(), "Số 1 bằng số 3, cả hai lớn hơn số 2");
    }

    @Test
    @DisplayName("TC07 - Ba số bằng nhau: 7, 7, 7 → 7")
    void testAllEqual() {
        finder.setNumber1(7);
        finder.setNumber2(7);
        finder.setNumber3(7);
        assertEquals(7, finder.max3(), "Ba số bằng nhau");
    }
}
