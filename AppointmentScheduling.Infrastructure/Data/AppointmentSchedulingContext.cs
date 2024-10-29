using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduling.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;

namespace AppointmentScheduling.Infrastructure.Data
{
    public class AppointmentSchedulingContext :DbContext
    {
        public AppointmentSchedulingContext(DbContextOptions<AppointmentSchedulingContext> options) : base(options)
        { }

        public DbSet<Appointments> Appointments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<DoctorSpecialization> DoctorSpecializations { get; set; }

        public DbSet<Patients> patients { get; set; }
        public DbSet<Specialization> Specializations { get; set; }

    }
}
 