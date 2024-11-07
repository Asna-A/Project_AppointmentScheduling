using static AppointmentScheduling.Domain.Entity.Appointments;

namespace AppointmentScheduling.Application.DTO
{
    public class BookStatusDTO
    {
        public StatusEnum Status { get; set; }
    }
}
