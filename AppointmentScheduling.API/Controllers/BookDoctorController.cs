using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookDoctorController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BookDoctorController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<BookStatusDTO> BookDoctor([FromBody] BookDoctorCommand BookDoctorCommand)
        {
          
            return await _mediator.Send(BookDoctorCommand);
            

           
        }
    }
}
