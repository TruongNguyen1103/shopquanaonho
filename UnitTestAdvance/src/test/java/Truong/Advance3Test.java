package Truong;

import NguyenDangQuang.Advance3;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q9 - Unit Test cho Advance3 (Số Fibonacci)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q9 - Advance3: Số Fibonacci")
class Advance3Test {

    Advance3 x;

    @BeforeEach
    void setUp() {
        x = new Advance3();
    }

    @Test
    @DisplayName("TC01 - fibonacci(7) → F0=0,F1=1,F2=1,F3=2,F4=3,F5=5,F6=8,F7=13")
    void testFibonacci() {
        assertEquals(13, x.fibonacci(7), "fibonacci(7) phải bằng 13");
    }

    @Test
    @DisplayName("TC02 - fibonacci(5) → 5")
    void testFibonacciN5() {
        assertEquals(5, x.fibonacci(5), "fibonacci(5) phải bằng 5");
    }

    @Test
    @DisplayName("TC03 - fibonacci(-1) → -1 (số âm)")
    void testFibonacciWithNegativeNumber() {
        assertEquals(-1, x.fibonacci(-1), "Số âm phải trả về -1");
    }

    @Test
    @DisplayName("TC04 - fibonacci(0) → 0")
    void testFibonacciWithZero() {
        assertEquals(0, x.fibonacci(0), "fibonacci(0) phải bằng 0");
    }

    @Test
    @DisplayName("TC05 - fibonacci(1) → 1")
    void testFibonacciN1() {
        assertEquals(1, x.fibonacci(1), "fibonacci(1) phải bằng 1");
    }
}
