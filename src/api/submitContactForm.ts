'use server';
import {revalidatePath} from 'next/cache';

export const submitContactForm = async (_: any, formData: FormData) => {
  try {
    console.log('formData', formData.get('email'), formData.get('message'));
    await new Promise<void>(res => setTimeout(() => res(), 2000));
    formData.delete('email');
    formData.delete('message');
    revalidatePath('/');
    return {message: 'Message has been successfully submitted'};
  } catch (error) {
    console.log('submit contact form', error);
    return {message: 'From submission error'};
  }
};
