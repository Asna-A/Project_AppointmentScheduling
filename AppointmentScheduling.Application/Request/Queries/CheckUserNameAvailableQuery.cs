using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class CheckUserNameAvailableQuery : IRequest<bool>
    {
        public string userName { get; set; }    
    }

    public class CheckUserNameAvailableQueryHandler : IRequestHandler<CheckUserNameAvailableQuery, bool>
    {
        private readonly AppointmentSchedulingContext context;

        public CheckUserNameAvailableQueryHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<bool> Handle(CheckUserNameAvailableQuery request, CancellationToken cancellationToken)
        {
            return await context.patients
                   .AnyAsync(x => x.UserName == request.userName);
        }
    }
}
