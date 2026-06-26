package Truong;

import NguyenDangQuang.LoginService;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Q16 - Unit Test cho LoginService (Đăng nhập)
 * Package source : NguyenDangQuang
 * Package test   : Truong
 */
@DisplayName("Q16 - LoginService: Kiểm tra đăng nhập")
class LoginServiceTest {

    @BeforeEach
    void setUp() {
        // Setup trước mỗi test nếu cần
    }

    @AfterEach
    void tearDown() {
        // Dọn dẹp sau mỗi test nếu cần
    }

    @Test
    @DisplayName("TC01 - Đăng nhập thành công: user/password → true")
    void testLogin_success() {
        assertTrue(LoginService.login("user", "password"),
            "Đăng nhập thành công nên trả về true");
    }

    @Test
    @DisplayName("TC02 - Sai tên người dùng: invalidUser/password → false")
    void testLogin_invalidUsername() {
        assertFalse(LoginService.login("invalidUser", "password"),
            "Sai tên người dùng phải trả về false");
    }

    @Test
    @DisplayName("TC03 - Sai mật khẩu: user/wrongPassword → false")
    void testLogin_incorrectPassword() {
        assertFalse(LoginService.login("user", "wrongPassword"),
            "Sai mật khẩu phải trả về false");
    }

    @Test
    @DisplayName("TC04 - Sai cả tên và mật khẩu: guest/123456 → false")
    void testLogin_wrongBoth() {
        assertFalse(LoginService.login("guest", "123456"),
            "Sai cả tên và mật khẩu phải trả về false");
    }

    @Test
    @DisplayName("TC05 - Tên và mật khẩu rỗng: '' / '' → false")
    void testLogin_emptyCredentials() {
        assertFalse(LoginService.login("", ""),
            "Thông tin rỗng phải trả về false");
    }

    @Test
    @DisplayName("TC06 - Tên rỗng, mật khẩu đúng: '' / password → false")
    void testLogin_emptyUsernameCorrectPassword() {
        assertFalse(LoginService.login("", "password"),
            "Tên đăng nhập rỗng phải trả về false");
    }

    @Test
    @DisplayName("TC07 - Tên đúng, mật khẩu rỗng: user / '' → false")
    void testLogin_correctUsernameEmptyPassword() {
        assertFalse(LoginService.login("user", ""),
            "Mật khẩu rỗng phải trả về false");
    }

    @Test
    @DisplayName("TC08 - Tên có khoảng trắng: ' user ' / password → false")
    void testLogin_usernameWithSpaces() {
        assertFalse(LoginService.login(" user ", " password "),
            "Tên/mật khẩu có khoảng trắng thừa phải trả về false (không có trim)");
    }
}
