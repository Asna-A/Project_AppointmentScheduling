namespace AppointmentScheduling.Application.DTO
{
    public class GetAppointmentsByDoctorDTO
    {
        public int Id { get; set; }
        public string patientName { get; set; }
        public List<string> DoctorSpecialization { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public Domain.Entity.Appointments.SlotTime SlotTime { get; set; }

        public Boolean status { get; set; }

    }
}
