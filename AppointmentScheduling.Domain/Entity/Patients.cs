using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduling.Domain.Entity
{
    public class Patients
    {
        [Key]
        public int Id { get; set; }  
        public string PatientName { get; set; }   
        public string Age { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pin { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public List<Appointments> Appointments { get; set; }

        

    }
}
