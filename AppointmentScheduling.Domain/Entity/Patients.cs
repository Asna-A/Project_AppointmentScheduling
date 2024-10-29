using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduling.Domain.Entity
{
    public class Patients
    {
        [Key]
        public int Id { get; set; }  
        public string PatientName { get; set; }   
        public int Age { get; set; }
        public char Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PIN { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public List<Appointments> Appointments { get; set; }


    }
}
