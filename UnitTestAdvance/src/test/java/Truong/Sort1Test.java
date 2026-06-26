package Truong;

import NguyenDangQuang.Sort1;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q4 - Unit Test cho Sort1 (sắp xếp tăng dần 2 số)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q4 - Sort1: Sắp xếp tăng dần 2 số")
class Sort1Test {

    Sort1 x;

    @BeforeEach
    void setUp() {
        x = new Sort1();
    }

    @Test
    @DisplayName("TC01 - number1 > number2: (5, 2) → sortAsc → number1=2, number2=5")
    void testNumber1GreaterThanNumber2() {
        x.setNumber1(5);
        x.setNumber2(2);
        x.sortAsc();
        assertTrue(x.getNumber1() == 2 && x.getNumber2() == 5,
            "Sau khi sortAsc, number1 phải là 2 và number2 phải là 5");
    }

    @Test
    @DisplayName("TC02 - number1 < number2: (2, 5) → sortAsc → number1=2, number2=5 (không đổi)")
    void testNumber1LessThanNumber2() {
        x.setNumber1(2);
        x.setNumber2(5);
        x.sortAsc();
        assertTrue(x.getNumber1() == 2 && x.getNumber2() == 5,
            "Khi đã đúng thứ tự, hai số không thay đổi");
    }

    @Test
    @DisplayName("TC03 - Hai số bằng nhau: (4, 4) → sortAsc → number1=4, number2=4")
    void testBothEqual() {
        x.setNumber1(4);
        x.setNumber2(4);
        x.sortAsc();
        assertTrue(x.getNumber1() == 4 && x.getNumber2() == 4,
            "Khi hai số bằng nhau, không thay đổi");
    }
}
