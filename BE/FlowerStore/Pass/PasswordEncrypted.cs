//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

//namespace ClothesShop.Option
//{
//    public class PasswordEncrypted
//    {
//        public static string Encrypt(string origin)
//        {
//            string salt = BCrypt.Net.BCrypt.GenerateSalt();
//            string hash = BCrypt.Net.BCrypt.HashPassword(origin, salt);

//            return hash;
//        }

//        public static bool Validate(string password, string passwordEncrypted)
//        {
//            bool result = BCrypt.Net.BCrypt.Verify(password, passwordEncrypted);
//            return result;
//        }
//    }
//}