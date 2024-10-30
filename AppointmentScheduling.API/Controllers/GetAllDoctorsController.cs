using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetAllDoctorsController : ControllerBase
    {
        private readonly IMediator mediator;

        public GetAllDoctorsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]

        public async Task<List<GetAllDoctorsDTO>> Get()
        {
            GetAllDoctorsCommand getAllDoctorsCommand = new GetAllDoctorsCommand();
            return await mediator.Send(getAllDoctorsCommand);
        }
    }
}
