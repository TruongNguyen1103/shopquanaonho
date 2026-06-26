package Truong;

import NguyenDangQuang.Sort2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q5 - Unit Test cho Sort2 (sắp xếp giảm dần, static)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q5 - Sort2: Sắp xếp giảm dần 2 số (static)")
class Sort2Test {

    @Test
    @DisplayName("TC01 - number1 > number2: (8, 3) → sortDesc → number1=8, number2=3 (không đổi)")
    void testNumber1GreaterThanNumber2() {
        Sort2.number1 = 8;
        Sort2.number2 = 3;
        Sort2.sortDesc();
        assertTrue(Sort2.number1 == 8 && Sort2.number2 == 3,
            "Khi đã đúng thứ tự giảm, hai số không thay đổi");
    }

    @Test
    @DisplayName("TC02 - number1 < number2: (3, 8) → sortDesc → number1=8, number2=3")
    void testNumber1LessThanNumber2() {
        Sort2.number1 = 3;
        Sort2.number2 = 8;
        Sort2.sortDesc();
        assertTrue(Sort2.number1 == 8 && Sort2.number2 == 3,
            "Sau sortDesc, số lớn hơn phải ở vị trí number1");
    }

    @Test
    @DisplayName("TC03 - Hai số bằng nhau: (5, 5) → sortDesc → number1=5, number2=5")
    void testBothEqual() {
        Sort2.number1 = 5;
        Sort2.number2 = 5;
        Sort2.sortDesc();
        assertTrue(Sort2.number1 == 5 && Sort2.number2 == 5,
            "Khi hai số bằng nhau, không thay đổi");
    }
}
