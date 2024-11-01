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
        public async Task<IActionResult> BookDoctor([FromBody] BookDoctorCommand command)
        {
            var result = await _mediator.Send(command);
            if (result)
                return Ok(new { message = "Appointment booked successfully" });

            else
                return StatusCode(500, new { error = "An error occurred while booking the appointment." });
        }
    }
}
