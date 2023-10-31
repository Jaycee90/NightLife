const sendInvite = () => {
    console.log('sendEmail function called');
    // Creating message with selected venues attached
    const messageWithSelectedVenues = `Selected Venues:\n${selectedVenues.join('\n')}`
    const emailDataWithVenues = {
      ...emailData,
      text: messageWithSelectedVenues, // Append selected venues to text
    };