using AppointmentScheduling.Domain.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AppointmentScheduling.Infrastructure.Data.Configurations
{
    public class DoctorSpecializationConfiguration : IEntityTypeConfiguration<DoctorSpecialization>
    {
        public void Configure(EntityTypeBuilder<DoctorSpecialization> builder)
        {
            builder.Property(x => x.Id).ValueGeneratedOnAdd().HasColumnName("Id");

            builder.HasOne(x => x.Doctor)
                .WithMany(x => x.DoctorSpecializations)
                .HasForeignKey(x => x.DoctorId);

            builder.HasOne(x => x.Specialization)
                .WithMany(x => x.DoctorSpecializations)
                .HasForeignKey(x => x.SpecializationId);
        }
    }
}
