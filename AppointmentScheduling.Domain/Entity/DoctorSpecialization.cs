namespace AppointmentScheduling.Domain.Entity
{
    public class DoctorSpecialization
    {
        public int Id { get; set; }
        public int SpecializationId { get; set; }
        public int DoctorId { get; set; }
        public virtual Doctor Doctor { get; set; } = null!;
        public virtual Specialization Specialization { get; set; } = null!;
    }
}
