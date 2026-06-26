package NguyenDangQuang;

public class Advance5 {
    public boolean kiemTraDoiXung(int number) {
        StringBuilder xau = new StringBuilder();
        String str = number + "";
        xau.append(str);
        String check = xau.reverse().toString();
        if (str.equals(check))
            return true;
        return false;
    }
}
