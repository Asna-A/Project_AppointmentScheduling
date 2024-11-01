using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class UpdateDetailsCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string phone {  get; set; }  
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }   

        public string Pin { get; set; }
        
    }

    public class UpdateDetailsCommandHandler : IRequestHandler<UpdateDetailsCommand, int>
    {
        private readonly AppointmentSchedulingContext context;

        public UpdateDetailsCommandHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<int> Handle(UpdateDetailsCommand request, CancellationToken cancellationToken)
        {
            Patients patinet = context.patients.Where(x => x.Id == request.Id).FirstOrDefault();
            
            patinet.PatientName = request.PatientName;
            patinet.Phone = request.phone;
            patinet.Email = request.Email;
            patinet.City = request.City;    
            patinet.State = request.State;  
            patinet.Pin = request.Pin;

            context.patients.Update(patinet);
            return await context.SaveChangesAsync();
            
            
        }
    }
}
