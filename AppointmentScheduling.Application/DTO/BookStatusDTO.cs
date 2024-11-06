using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static AppointmentScheduling.Domain.Entity.Appointments;

namespace AppointmentScheduling.Application.DTO
{
    public class BookStatusDTO
    {
        public StatusEnum Status { get; set; }
    }
}
