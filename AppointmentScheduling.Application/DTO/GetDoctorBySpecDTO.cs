using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduling.Application.DTO
{
    public class GetDoctorBySpecDTO
    {
        public string DoctorId { get; set; }
        public string Name { get; set; }
        public int Experience { get; set; }
        public string RegistrationId { get; set; }
    }
}
