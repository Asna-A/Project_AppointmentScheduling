using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class AddPatientCommand : IRequest<int>
    {
        public string PatientName { get; set; }
        public String Age { get; set; }
        public String Gender { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string Pin { get; set; }
        public string username { get; set; }
        public string password { get; set; }

        public class AddPatientCommandHandler : IRequestHandler<AddPatientCommand, int>
        {
            private readonly AppointmentSchedulingContext _context;

            public AddPatientCommandHandler(AppointmentSchedulingContext context)
            {
                _context = context;
            }
            public async Task<int> Handle(AddPatientCommand request, CancellationToken cancellationToken)
            {
                var patient = new Patients
                {
                    PatientName = request.PatientName,
                    Age = request.Age,
                    Gender = request.Gender,
                    Email = request.Email,
                    Phone = request.Phone,
                    City = request.City,
                    State = request.State,
                    Pin = request.Pin,
                    UserName = request.username,
                    Password = request.password

                };
                _context.patients.Add(patient);
                await _context.SaveChangesAsync();
                return patient.Id;
            }
        }
    }
}
