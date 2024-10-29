using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduling.Application.DTO
{
    public class AddpatientDTO
    {
        public string PatientName { get; set; }
        public String Age { get; set; }
        public char Gender { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Pin { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
