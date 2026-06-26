package Truong;

import NguyenDangQuang.ArraySum;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q14 - Unit Test cho ArraySum (Tính tổng mảng số nguyên)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q14 - ArraySum: Tính tổng các phần tử mảng")
class ArraySumTest {

    ArraySum x = new ArraySum();

    @Test
    @DisplayName("TC01 - calculateSum({1,2,3,4,5}) → 15")
    void testCalculateSum_positiveNumbers() {
        int[] sum1 = {1, 2, 3, 4, 5};
        int expectedSum = 15;
        int actualSum = x.calculateSum(sum1);
        assertEquals(expectedSum, actualSum, "Test với mảng số dương");
    }

    @Test
    @DisplayName("TC02 - calculateSum({-1,0,1}) → 0")
    void testCalculateSum_mixedNumbers() {
        int[] sum2 = {-1, 0, 1};
        int expectedSum = 0;
        int actualSum = x.calculateSum(sum2);
        assertEquals(expectedSum, actualSum, "Test với mảng hỗn hợp âm-không-dương");
    }

    @Test
    @DisplayName("TC03 - calculateSum({10,20,30,40,50}) → 150")
    void testCalculateSum_largerNumbers() {
        int[] sum3 = {10, 20, 30, 40, 50};
        int expectedSum = 150;
        int actualSum = x.calculateSum(sum3);
        assertEquals(expectedSum, actualSum, "Test với mảng số lớn hơn");
    }
}
