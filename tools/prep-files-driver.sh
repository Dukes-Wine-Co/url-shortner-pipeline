source env.sh;
source tools/prep-files.sh;

(echo 'Starting the driver to prep files for processing'; echo 'Loading the files from the external storage bucket'; loadBucketFiles) \
&& (echo 'Logs successfully loaded locally'; echo 'Unzipping files'; unzipFiles) \
&& (echo 'Unzipping files complete'; echo 'Processing logs'; processLogs) \
&& (echo 'Logs successfully processed'; echo 'Prep complete');
