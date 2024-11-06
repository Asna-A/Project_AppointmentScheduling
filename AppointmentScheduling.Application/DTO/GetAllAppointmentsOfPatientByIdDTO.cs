namespace AppointmentScheduling.Application.DTO
{
    public class GetAllAppointmentsOfPatientByIdDTO
    {

        public int Id { get; set; }
        public string DoctorName { get; set; }  
        public List<string> DoctorSpecialization {  get; set; }
        public DateOnly  AppointmentDate {  get; set; } 
        public AppointmentScheduling.Domain.Entity.Appointments.SlotTime SlotTime { get; set; }

        public Domain.Entity.Appointments.StatusEnum Status { get; set; }




    }
}
