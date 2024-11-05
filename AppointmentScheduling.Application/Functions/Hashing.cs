using System.Security.Cryptography;
using System.Text;


namespace AppointmentScheduling.Application.Functions
{
    public class Hashing
    {
        public String HashPassword(String password)
        {
            SHA256 hash = SHA256.Create();
            var passwordBytes = Encoding.Default.GetBytes(password);
            var hashedPassword = hash.ComputeHash(passwordBytes);
            return Convert.ToHexString(hashedPassword);

        }

    }
}