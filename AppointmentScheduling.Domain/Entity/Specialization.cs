using System.ComponentModel.DataAnnotations;

namespace AppointmentScheduling.Domain.Entity
{
    public class Specialization
    {
        public int Id { get; set; }

        public string SpecializationName { get; set; }  

        public virtual List<DoctorSpecialization> DoctorSpecializations { get; set; }  


        
    }
}
