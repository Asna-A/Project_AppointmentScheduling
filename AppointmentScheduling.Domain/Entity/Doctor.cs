namespace AppointmentScheduling.Domain.Entity
{
    public class Doctor
    {
        public int  Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Experience { get; set; }
        public string RegistrationId { get; set; }

        public virtual List<Appointments> Appointments { get; set; } = [];

        public virtual List<DoctorSpecialization> DoctorSpecializations { get; set; } = [];
    }
}
