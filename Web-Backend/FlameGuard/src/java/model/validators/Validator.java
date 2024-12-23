package model.validators;

import java.util.regex.Pattern;

public class Validator {

    // Method to validate uppercase, lowercase, and optionally digits, with dynamic size
    public static boolean validatePassword(String password, int requiredLength, boolean checkDigits) {
        if (!sizeChecker(password, requiredLength)) {
            return false;
        }
        return validateUppercase(password, requiredLength)
                && validateLowercase(password, requiredLength)
                && (!checkDigits || validateDigit(password, requiredLength));
    }

    // Size checking method to ensure password length is within the required size
    public static boolean sizeChecker(String password, int requiredLength) {
        if (password.length() != requiredLength) {
            System.out.println("Password must be exactly " + requiredLength + " characters long.");
            return false;
        }
        return true;
    }

    public static boolean validateUppercase(String password, int requiredLength) {
        if (!sizeChecker(password, requiredLength)) {
            return false;
        }
        if (!Pattern.compile("[A-Z]").matcher(password).find()) {
            System.out.println("Password must contain at least one uppercase letter.");
            return false;
        }
        return true;
    }

    // Validation method for lowercase letters, with dynamic size
    public static boolean validateLowercase(String password, int requiredLength) {
        if (!sizeChecker(password, requiredLength)) {
            return false;
        }
        if (!Pattern.compile("[a-z]").matcher(password).find()) {
            System.out.println("Password must contain at least one lowercase letter.");
            return false;
        }
        return true;
    }

    // Validation method for digits, with dynamic size
    public static boolean validateDigit(String password, int requiredLength) {
        if (!sizeChecker(password, requiredLength)) {
            return false;
        }
        if (!Pattern.compile("\\d").matcher(password).find()) {
            System.out.println("Password must contain at least one digit.");
            return false;
        }
        return true;
    }
}
