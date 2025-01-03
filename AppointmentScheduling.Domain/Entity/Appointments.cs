﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduling.Domain.Entity
{
    public class Appointments
    {
        [Key]
        public int Id { get; set; }


        public DateOnly AppointmentDate {  get; set; }  
        public enum SlotTime
        {
            NineToNineThirty,
            NineThirtyToTen,
            TenToTenThirty,
            TenThirtyToEleven,
            ElevenToElevenThirty,
            FourToFourThirty,
            FourThirtyToFive,
            FiveToFiveThirty,
            FiveThirtyToSix,
            SixToSixThirty


        }

        public SlotTime slot {  get; set; } 
        public enum StatusEnum
        {
            live,
            cancelled,
            consulted,
            not_Consulted
            
        }
        public StatusEnum Status { get; set; } = StatusEnum.not_Consulted;

        public Patients Patient { get; set; }
        public int PatientId { get; set; }

        public Doctor Doctor { get; set; }
        public int DoctorId { get; set; }


    }
}
