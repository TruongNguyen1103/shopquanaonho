package Truong;

import NguyenDangQuang.StringReversal;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q15 - Unit Test cho StringReversal (Đảo ngược chuỗi)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q15 - StringReversal: Đảo ngược chuỗi ký tự")
class StringReversalTest {

    StringReversal x = new StringReversal();

    @Test
    @DisplayName("TC01 - reverseString('hello') → 'olleh'")
    void testReverseString_normalString() {
        String input1 = "hello";
        String expectedOutput1 = "olleh";
        String actualOutput1 = x.reverseString(input1);
        assertEquals(expectedOutput1, actualOutput1, "Test với chuỗi thông thường");
    }

    @Test
    @DisplayName("TC02 - reverseString('world') → 'dlrow'")
    void testReverseString_anotherString() {
        String input = "world";
        String expectedOutput = "dlrow";
        assertEquals(expectedOutput, x.reverseString(input),
            "Test với chuỗi 'world'");
    }

    @Test
    @DisplayName("TC03 - reverseString('') → '' (chuỗi rỗng)")
    void testReverseString_emptyString() {
        assertEquals("", x.reverseString(""),
            "Chuỗi rỗng đảo ngược vẫn là chuỗi rỗng");
    }

    @Test
    @DisplayName("TC04 - reverseString('a') → 'a' (chuỗi 1 ký tự)")
    void testReverseString_singleChar() {
        assertEquals("a", x.reverseString("a"),
            "Chuỗi một ký tự đảo ngược không thay đổi");
    }

    @Test
    @DisplayName("TC05 - reverseString('hello world') → 'dlrow olleh' (có khoảng trắng)")
    void testReverseString_withSpaces() {
        String input = "hello world";
        String expectedOutput = "dlrow olleh";
        assertEquals(expectedOutput, x.reverseString(input),
            "Chuỗi có khoảng trắng phải giữ nguyên vị trí khoảng trắng khi đảo");
    }
}
