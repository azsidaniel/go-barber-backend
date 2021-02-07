import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

type RequestDTO = {
  provider: string;
  date: Date;
};

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const appointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
