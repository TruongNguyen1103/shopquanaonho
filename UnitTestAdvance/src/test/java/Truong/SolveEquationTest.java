package Truong;

import NguyenDangQuang.SolveEquation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q1 - Unit Test cho SolveEquation
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q1 - SolveEquation: Giải phương trình bậc nhất")
class SolveEquationTest {

    private SolveEquation equation;

    @BeforeEach
    void setUp() {
        equation = new SolveEquation();
    }

    @Test
    @DisplayName("TC01 - Vô số nghiệm: number1=0, number2=0 → 'Multi roots'")
    void testMultiRoots() {
        String result = equation.linearEquation(0, 0);
        assertEquals("Multi roots", result,
            "Khi number1=0 và number2=0 phải trả về 'Multi roots'");
    }

    @Test
    @DisplayName("TC02 - Vô nghiệm: number1=0, number2≠0 → 'No root'")
    void testNoRoot() {
        String result = equation.linearEquation(0, 5);
        assertEquals("No root", result,
            "Khi number1=0 và number2≠0 phải trả về 'No root'");
    }

    @Test
    @DisplayName("TC03 - Một nghiệm: number1≠0 → 'One root'")
    void testOneRoot() {
        String result = equation.linearEquation(3, 7);
        assertEquals("One root", result,
            "Khi number1≠0 phải trả về 'One root'");
    }
}
